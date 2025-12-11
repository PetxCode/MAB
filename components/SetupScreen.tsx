import React, { useState, useEffect } from "react";
import { COURSE_MODULES } from "../constants";
import { Button } from "./Button";
import { CourseModule, Course } from "../types";

interface SetupScreenProps {
  course: Course;
  onStart: (moduleName: string, sessionName: string) => void;
  onBack: () => void;
  activeSessionLabel?: string | null;
  onResume?: () => void;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({
  course,
  onStart,
  onBack,
  activeSessionLabel,
  onResume,
}) => {
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(
    null
  );
  const [selectedSession, setSelectedSession] = useState<string>("");

  useEffect(() => {
    // Load modules for the selected course
    const courseModules = COURSE_MODULES[course.id] || [];
    setModules(courseModules);
    setSelectedModule(null);
    setSelectedSession("");
  }, [course]);

  const handleModuleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const moduleId = e.target.value;
    const module = modules.find((m) => m.id === moduleId) || null;
    setSelectedModule(module);
    setSelectedSession(""); // Reset session when module changes
  };

  const canStart = !!selectedModule && !!selectedSession;

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-0 mt-8 md:mt-16">
      {/* Resume Banner in Setup (if applicable to this course) */}
      {activeSessionLabel && onResume && (
        <div className="mb-6 animate-fade-in-up">
          <div className="bg-white rounded-xl p-4 shadow-md border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-100 p-2 rounded-full">
                <svg
                  className="w-5 h-5 text-emerald-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                  In Progress
                </p>
                <p className="text-slate-900 font-semibold">
                  {activeSessionLabel}
                </p>
              </div>
            </div>
            <Button size="sm" onClick={onResume} className="shadow-emerald-100">
              Resume
            </Button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={onBack}
              className="mr-4 text-slate-400 hover:text-emerald-600 transition-colors bg-white p-2 rounded-full shadow-sm border border-slate-200 hover:border-emerald-200"
              title="Back to courses"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <div>
              <span className="text-emerald-600 text-xs font-bold tracking-widest uppercase mb-1 block">
                Course Configuration
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-none">
                {course.title}
              </h1>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="text-4xl font-black text-slate-100">
              {course.code.split(" ")[1]}
            </span>
          </div>
        </div>

        <div className="p-8 space-y-8 min-h-[300px]">
          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Select Module
              </label>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-4 text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 appearance-none transition-shadow hover:border-slate-300"
                  onChange={handleModuleChange}
                  value={selectedModule?.id || ""}
                >
                  <option value="" disabled>
                    Choose a learning module...
                  </option>
                  {modules.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.title}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Select Session
              </label>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-10 py-4 text-base border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-slate-50/50 appearance-none disabled:opacity-50 disabled:bg-slate-100 transition-shadow hover:border-slate-300"
                  onChange={(e) => setSelectedSession(e.target.value)}
                  disabled={!selectedModule}
                  value={selectedSession}
                >
                  <option value="" disabled>
                    Choose a specific session...
                  </option>
                  {selectedModule?.sessions.map((s, idx) => (
                    <option key={idx} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-5 rounded-xl border border-slate-200 flex items-start gap-4">
            <div className="bg-white p-2 rounded-lg shadow-sm border border-slate-100 text-emerald-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm mb-1">
                Exam Parameters
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                You will be tested on{" "}
                <strong className="text-slate-700">20 random questions</strong>{" "}
                from a pool of 50.
                <br />
                Time limit is set strictly to{" "}
                <strong className="text-slate-700">8 minutes</strong>.
              </p>
            </div>
          </div>

          <Button
            fullWidth
            size="lg"
            variant="primary"
            onClick={() =>
              selectedModule && onStart(selectedModule.title, selectedSession)
            }
            disabled={!canStart}
            className="shadow-lg shadow-emerald-200"
          >
            Start Practice Exam
          </Button>
        </div>
      </div>
    </div>
  );
};
