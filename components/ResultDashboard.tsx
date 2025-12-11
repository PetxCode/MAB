import React from 'react';
import { Question, UserAnswers, QuizResult } from '../types';
import { Button } from './Button';

interface ResultDashboardProps {
  questions: Question[];
  answers: UserAnswers;
  onRetry: () => void;
  onHome: () => void;
}

export const ResultDashboard: React.FC<ResultDashboardProps> = ({ questions, answers, onRetry, onHome }) => {
  
  const calculateResult = (): QuizResult => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) correct++;
    });
    
    return {
      totalQuestions: questions.length,
      correctAnswers: correct,
      percentage: Math.round((correct / questions.length) * 100),
      timeTaken: 0 
    };
  };

  const result = calculateResult();
  
  // Grading 
  const isExcellent = result.percentage >= 70;
  const isPass = result.percentage >= 50 && result.percentage < 70;
  
  const gradeColor = isExcellent ? 'text-emerald-600' : isPass ? 'text-amber-500' : 'text-rose-500';
  const gradeBg = isExcellent ? 'bg-emerald-50' : isPass ? 'bg-amber-50' : 'bg-rose-50';
  const gradeBorder = isExcellent ? 'border-emerald-200' : isPass ? 'border-amber-200' : 'border-rose-200';
  const gradeMessage = isExcellent ? 'Outstanding Performance' : isPass ? 'Good Effort' : 'Needs Improvement';

  return (
    <div className="h-full overflow-y-auto bg-slate-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Score Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200 p-8 md:p-10 text-center relative overflow-hidden">
          {/* Background decoration */}
          <div className={`absolute top-0 left-0 w-full h-2 ${isExcellent ? 'bg-emerald-500' : isPass ? 'bg-amber-400' : 'bg-rose-500'}`}></div>
          
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Assessment Report</h2>
          
          <div className="flex flex-col items-center justify-center mb-8">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center border-8 ${gradeBorder} ${gradeBg} mb-4`}>
                <span className={`text-5xl font-black ${gradeColor} tracking-tight`}>{result.percentage}%</span>
            </div>
            <p className="text-2xl font-bold text-slate-800">{gradeMessage}</p>
          </div>

          <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-3xl font-bold text-slate-800">{result.correctAnswers}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Correct</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-3xl font-bold text-slate-800">{result.totalQuestions}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Total</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <span className="block text-3xl font-bold text-slate-800">{result.totalQuestions - Object.keys(answers).length}</span>
              <span className="text-xs font-bold text-slate-400 uppercase">Skipped</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button onClick={onRetry} variant="primary" size="lg" className="shadow-lg shadow-emerald-200">
              Generate New Questions
            </Button>
            <Button onClick={onHome} variant="secondary" size="lg">
              Return to Menu
            </Button>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 mb-6 px-2 flex items-center gap-2">
            <span className="w-1 h-6 bg-slate-900 rounded-full"></span>
            Performance Analysis
          </h3>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              const isSkipped = !userAnswer;

              return (
                <div 
                  key={q.id} 
                  className={`bg-white rounded-xl border p-6 shadow-sm transition-shadow hover:shadow-md ${
                    isCorrect ? 'border-emerald-200' : isSkipped ? 'border-slate-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-sm font-bold text-slate-400 uppercase tracking-wide">Question {idx + 1}</span>
                    {isCorrect ? (
                      <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        CORRECT
                      </span>
                    ) : isSkipped ? (
                       <span className="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-md font-bold">SKIPPED</span>
                    ) : (
                      <span className="bg-rose-100 text-rose-800 text-xs px-2.5 py-1 rounded-md font-bold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        WRONG
                      </span>
                    )}
                  </div>
                  
                  <p className="text-lg font-semibold text-slate-800 mb-5 leading-relaxed">{q.text}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => {
                      let styles = "border-slate-100 bg-slate-50 text-slate-500";
                      let icon = null;
                      
                      if (opt === q.correctAnswer) {
                        styles = "border-emerald-500 bg-emerald-50 text-emerald-900 font-medium ring-1 ring-emerald-500";
                        icon = <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
                      } else if (opt === userAnswer && !isCorrect) {
                        styles = "border-rose-300 bg-rose-50 text-rose-800 line-through opacity-80";
                        icon = <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;
                      }

                      return (
                        <div key={i} className={`p-3.5 rounded-lg border flex items-center justify-between text-sm ${styles}`}>
                          <span>{opt}</span>
                          {icon}
                        </div>
                      );
                    })}
                  </div>
                  
                  {q.explanation && (
                    <div className="mt-5 pt-4 border-t border-slate-100">
                      <div className="flex gap-2">
                        <div className="mt-0.5 min-w-[20px]">
                           <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed"><span className="font-semibold text-slate-800">Explanation:</span> {q.explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};