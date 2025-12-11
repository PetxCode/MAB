import React from 'react';
import { COURSES } from '../constants';
import { Course } from '../types';

interface CourseSelectionScreenProps {
  onSelectCourse: (course: Course) => void;
  activeSessionLabel?: string | null;
  onResume?: () => void;
}

export const CourseSelectionScreen: React.FC<CourseSelectionScreenProps> = ({ 
  onSelectCourse, 
  activeSessionLabel, 
  onResume 
}) => {
  return (
    <div className="max-w-6xl mx-auto p-6 md:p-10 relative">
      
      {/* Resume Banner */}
      {activeSessionLabel && onResume && (
        <div className="mb-8 animate-fade-in-up">
           <div className="bg-slate-900 rounded-xl p-1 shadow-lg flex items-center justify-between overflow-hidden">
             <div className="flex items-center gap-4 px-6 py-4">
               <div className="bg-emerald-500 p-2 rounded-full animate-pulse">
                 <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
               </div>
               <div>
                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Active Session Found</p>
                 <p className="text-white font-medium truncate max-w-md">{activeSessionLabel}</p>
               </div>
             </div>
             <button 
               onClick={onResume}
               className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-4 font-bold text-sm transition-colors flex items-center gap-2 h-full rounded-r-lg"
             >
               Resume
               <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
             </button>
           </div>
        </div>
      )}

      <div className="text-center mb-16 mt-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Course</span>
        </h1>
        <p className="text-slate-500 text-lg max-w-2xl mx-auto">
          Choose a module below to access the dynamic CBT preparation system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {COURSES.map((course) => (
          <button
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group relative flex flex-col h-full bg-white rounded-2xl p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-slate-200"
          >
            {/* Top accent bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-slate-200 to-slate-100 rounded-t-2xl group-hover:from-emerald-500 group-hover:to-teal-500 transition-all duration-500"></div>
            
            <div className="flex items-start justify-between mb-5 mt-2">
              <span className="inline-block px-3 py-1 bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-wider rounded-md group-hover:bg-emerald-50 group-hover:text-emerald-700 transition-colors">
                {course.code}
              </span>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors leading-tight">
              {course.title}
            </h3>
            
            <p className="text-slate-400 text-sm mt-auto pt-4 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-emerald-400"></span>
              Start Preparation
            </p>
          </button>
        ))}
      </div>
      
      <div className="mt-24 pb-8 text-center">
        <div className="inline-flex flex-col items-center">
          <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-2">E-Library Open Courseware</p>
          <div className="h-px w-24 bg-slate-200 mb-3"></div>
          <p className="text-slate-500 text-sm font-medium">Built by <span className="text-slate-900 font-bold">Peter Oti</span> for ABU MBA students</p>
        </div>
      </div>
    </div>
  );
};