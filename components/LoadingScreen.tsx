import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600 mb-6"></div>
      <h2 className="text-2xl font-semibold text-slate-800 mb-2">Generating Quiz...</h2>
      <p className="text-slate-500 max-w-md">
        We are generating a fresh pool of 50 questions based on your selected session. 
        This ensures you get new practice material every time.
      </p>
    </div>
  );
};