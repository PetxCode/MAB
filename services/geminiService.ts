import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question } from '../types';
import { QUESTIONS_POOL_SIZE } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const questionSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    questionText: { type: Type.STRING },
    options: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 4 distinct options."
    },
    correctAnswer: { 
      type: Type.STRING,
      description: "Must match one of the options exactly."
    },
    explanation: { type: Type.STRING }
  },
  required: ["questionText", "options", "correctAnswer"]
};

const responseSchema: Schema = {
  type: Type.ARRAY,
  items: questionSchema
};

export const generateQuestionPool = async (courseCode: string, courseTitle: string, moduleName: string, sessionName: string): Promise<Question[]> => {
  try {
    const prompt = `
      You are an expert examiner for the postgraduate course:
      ${courseCode}: ${courseTitle}.
      
      Generate a pool of ${QUESTIONS_POOL_SIZE} multiple-choice questions (CBT format) specifically for:
      Module: ${moduleName}
      Topic: ${sessionName}

      The questions should be suitable for a postgraduate level.
      Ensure the questions cover various aspects of the topic (definitions, scenarios, strategic implications, theory).
      Provide exactly 4 options for each question.
      
      Output strict JSON.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: responseSchema,
        temperature: 0.7, // slightly creative to ensure variety
      }
    });

    const rawData = JSON.parse(response.text || '[]');
    
    // Map to our internal type and add IDs
    return rawData.map((q: any, index: number) => ({
      id: `q-${Date.now()}-${index}`,
      text: q.questionText,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || "No explanation provided."
    }));

  } catch (error) {
    console.error("Failed to generate questions:", error);
    throw new Error("Failed to generate questions. Please check your connection or API limit.");
  }
};