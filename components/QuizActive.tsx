import React, { useState, useEffect } from 'react';
import { Question, UserAnswers } from '../types';
import { Button } from './Button';

interface QuizActiveProps {
  questions: Question[];
  onComplete: (answers: UserAnswers) => void;
  sessionTitle: string;
  expiryTime: number;
  initialAnswers: UserAnswers;
}

export const QuizActive: React.FC<QuizActiveProps> = ({ 
  questions, 
  onComplete, 
  sessionTitle, 
  expiryTime,
  initialAnswers
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>(initialAnswers);
  
  // Calculate seconds remaining based on expiry time
  const calculateTimeLeft = () => Math.max(0, Math.floor((expiryTime - Date.now()) / 1000));
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // Timer Logic
  useEffect(() => {
    const timerId = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
      
      if (remaining <= 0) {
        clearInterval(timerId);
        onComplete(answers);
      }
    }, 1000);

    return () => clearInterval(timerId);
  }, [expiryTime, answers, onComplete]); // answers included to ensure onComplete has latest

  const handleSelectOption = (option: string) => {
    const currentQ = questions[currentQuestionIndex];
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: option
    }));
  };

  const navigateTo = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQ = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((Object.keys(answers).length) / questions.length) * 100;
  
  // Timer warning state
  const isTimeCritical = timeLeft < 60;

  return (
    <div className="flex flex-col h-full max-h-screen bg-slate-50">
      {/* Header / Sticky Timer */}
      <div className="bg-white border-b border-slate-200 shadow-sm px-6 py-4 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Session</span>
                <span className="text-sm font-semibold text-slate-800 max-w-[200px] truncate" title={sessionTitle}>{sessionTitle}</span>
             </div>
             <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-bold border border-slate-200">
               Q{currentQuestionIndex + 1}<span className="text-slate-400 font-normal">/{questions.length}</span>
             </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-mono font-bold text-xl transition-colors duration-300 ${isTimeCritical ? 'bg-red-50 text-red-600 border-red-200 animate-pulse' : 'bg-slate-50 text-slate-700 border-slate-200'}`}>
            <svg className={`w-5 h-5 ${isTimeCritical ? 'text-red-500' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {formatTime(timeLeft)}
          </div>
        </div>
        {/* Fine Progress Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-100">
          <div 
            className="bg-emerald-500 h-1 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
        <div className="max-w-3xl mx-auto mt-2 md:mt-6">
          {/* Question Card */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-200/60 mb-8 transition-all duration-300">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-8 leading-relaxed tracking-tight">
              {currentQ.text}
            </h3>

            <div className="space-y-4">
              {currentQ.options.map((option, idx) => {
                const isSelected = answers[currentQ.id] === option;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    className={`group w-full text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-start
                      ${isSelected 
                        ? 'border-emerald-500 bg-emerald-50/50 shadow-sm' 
                        : 'border-slate-100 hover:border-emerald-200 hover:bg-slate-50'
                      }`}
                  >
                    <div className={`mt-0.5 w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center flex-shrink-0 transition-colors
                      ${isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300 group-hover:border-emerald-400'}
                    `}>
                      {isSelected && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
                    </div>
                    <span className={`text-lg ${isSelected ? 'text-slate-900 font-medium' : 'text-slate-600'}`}>{option}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="bg-white border-t border-slate-200 px-6 py-4 sticky bottom-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Button 
            variant="secondary" 
            onClick={() => navigateTo(currentQuestionIndex - 1)}
            disabled={currentQuestionIndex === 0}
            className="w-32"
          >
            Previous
          </Button>

          {/* Quick Nav Bubbles (Hidden on small screens) */}
          <div className="hidden lg:flex space-x-1.5 overflow-x-auto scrollbar-hide max-w-[50%] px-4 py-2">
            {questions.map((q, idx) => {
              const isActive = idx === currentQuestionIndex;
              const isAnswered = !!answers[q.id];
              return (
                <button
                  key={q.id}
                  onClick={() => navigateTo(idx)}
                  className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all ${
                    isActive ? 'bg-slate-800 scale-125' :
                    isAnswered ? 'bg-emerald-400' : 'bg-slate-200 hover:bg-slate-300'
                  }`}
                  title={`Question ${idx + 1}`}
                />
              );
            })}
          </div>

          {isLastQuestion ? (
            <Button 
              variant="primary" 
              onClick={() => onComplete(answers)}
              className="bg-slate-900 hover:bg-slate-800 text-white w-32"
            >
              Submit
            </Button>
          ) : (
             <Button 
              variant="primary" 
              onClick={() => navigateTo(currentQuestionIndex + 1)}
              className="w-32"
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};