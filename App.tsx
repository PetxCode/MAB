import React, { useState, useEffect } from "react";
import { CourseSelectionScreen } from "./components/CourseSelectionScreen";
import { SetupScreen } from "./components/SetupScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { QuizActive } from "./components/QuizActive";
import { ResultDashboard } from "./components/ResultDashboard";
import { AppState, Question, UserAnswers, Course } from "./types";
import { generateQuestionPool } from "./services/geminiService";
import { QUESTIONS_PER_QUIZ, TIMER_DURATION_SECONDS } from "./constants";

const STORAGE_KEY = "BUAD_CBT_STATE_V1";

interface PersistedState {
  appState: AppState;
  selectedCourse: Course | null;
  questions: Question[];
  userAnswers: UserAnswers;
  currentSession: string;
  currentModule: string;
  quizExpiryTime: number | null; // Timestamp when quiz ends
}

const App: React.FC = () => {
  // --- State Initialization with Persistence ---
  const [isHydrated, setIsHydrated] = useState(false);

  const [appState, setAppState] = useState<AppState>(AppState.COURSE_SELECTION);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<UserAnswers>({});
  const [currentSession, setCurrentSession] = useState<string>("");
  const [currentModule, setCurrentModule] = useState<string>("");
  const [quizExpiryTime, setQuizExpiryTime] = useState<number | null>(null);

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // 1. Load state on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: PersistedState = JSON.parse(saved);
        setAppState(parsed.appState);
        setSelectedCourse(parsed.selectedCourse);
        setQuestions(parsed.questions);
        setUserAnswers(parsed.userAnswers);
        setCurrentSession(parsed.currentSession);
        setCurrentModule(parsed.currentModule);
        setQuizExpiryTime(parsed.quizExpiryTime);
      }
    } catch (e) {
      console.error("Failed to load persistence state", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Save state on change
  useEffect(() => {
    if (!isHydrated) return;

    const stateToSave: PersistedState = {
      appState,
      selectedCourse,
      questions,
      userAnswers,
      currentSession,
      currentModule,
      quizExpiryTime,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [
    appState,
    selectedCourse,
    questions,
    userAnswers,
    currentSession,
    currentModule,
    quizExpiryTime,
    isHydrated,
  ]);

  // --- Handlers ---

  const handleSelectCourse = (course: Course) => {
    setSelectedCourse(course);
    setAppState(AppState.SETUP);
  };

  const startQuiz = async (moduleName: string, sessionName: string) => {
    if (!selectedCourse) return;

    setAppState(AppState.LOADING);
    setCurrentModule(moduleName);
    setCurrentSession(sessionName);
    setErrorMsg(null);
    setUserAnswers({}); // Clear previous answers for new run

    try {
      // 1. Generate Pool
      const pool = await generateQuestionPool(
        selectedCourse.code,
        selectedCourse.title,
        moduleName,
        sessionName
      );

      if (!pool || pool.length === 0) {
        throw new Error("No questions were generated.");
      }

      // 2. Randomize and Select
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(
        0,
        Math.min(pool.length, QUESTIONS_PER_QUIZ)
      );

      setQuestions(selected);

      // 3. Set Timer Expiry (Now + Duration)
      const now = Date.now();
      const expiry = now + TIMER_DURATION_SECONDS * 1000;
      setQuizExpiryTime(expiry);

      setAppState(AppState.ACTIVE);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(
        "Failed to generate questions. Please ensure the API Key is valid and try again."
      );
      setAppState(AppState.SETUP);
    }
  };

  const handleQuizComplete = (answers: UserAnswers) => {
    setUserAnswers(answers);
    setAppState(AppState.REVIEW);
    setQuizExpiryTime(null); // Clear timer
  };

  const handleRetry = () => {
    // Go to setup, but KEEP the course selected
    setAppState(AppState.SETUP);
    setUserAnswers({});
    setQuestions([]);
    setQuizExpiryTime(null);
  };

  const handleHome = () => {
    // Just change the view, DO NOT clear data so we can resume
    setAppState(AppState.COURSE_SELECTION);
    // We purposefully leave selectedCourse, questions, etc. intact
  };

  const handleBackToCourses = () => {
    setAppState(AppState.COURSE_SELECTION);
    // We leave data intact here too, in case they want to go back forward
  };

  const handleResumeSession = () => {
    // Logic to decide where to go based on state
    if (questions.length > 0) {
      // If we have answers and no expiry time, likely review
      if (
        appState === AppState.REVIEW ||
        (!quizExpiryTime && Object.keys(userAnswers).length > 0)
      ) {
        setAppState(AppState.REVIEW);
      } else {
        setAppState(AppState.ACTIVE);
      }
    }
  };

  // Determine if we have an active session to resume
  const hasActiveSession = questions.length > 0 && selectedCourse !== null;
  const activeSessionLabel = selectedCourse
    ? `${selectedCourse.code} - ${currentSession}`
    : "Session";

  if (!isHydrated) return null; // Prevent flash of default state

  return (
    <div className="h-[100dvh] w-full bg-slate-50 flex flex-col font-sans">
      {/* Navbar for context */}
      <div className="bg-slate-900 text-white px-6 py-4 shadow-lg flex justify-between items-center flex-shrink-0 z-30 border-b border-slate-800">
        <div
          className="font-bold text-lg tracking-tight flex items-center gap-3 cursor-pointer hover:text-emerald-400 transition-colors"
          onClick={handleHome}
        >
          <div className="bg-emerald-500 rounded-md p-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
            </svg>
          </div>
          <span className="font-semibold tracking-tight">
            BUAD E-Library CBT
          </span>
        </div>

        <div className="flex items-center gap-4">
          {selectedCourse && (
            <div className="hidden sm:flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-full border border-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-xs font-medium text-slate-300">
                {selectedCourse.code}
              </span>
            </div>
          )}
          {appState === AppState.ACTIVE && (
            <span className="text-xs font-medium text-emerald-400 border-l border-slate-700 pl-4 hidden md:block">
              {currentSession}
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {errorMsg && (
          <div className="absolute top-6 left-0 right-0 z-50 px-6 flex justify-center">
            <div className="max-w-xl w-full bg-white border-l-4 border-red-500 text-slate-700 px-6 py-4 rounded-r-lg shadow-xl flex items-start justify-between">
              <div>
                <h4 className="font-bold text-red-600 mb-1">
                  Error Encountered
                </h4>
                <p className="text-sm">{errorMsg}</p>
              </div>
              <button
                onClick={() => setErrorMsg(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <div className="h-full overflow-y-auto overflow-x-hidden scroll-smooth pb-32">
          {appState === AppState.COURSE_SELECTION && (
            <CourseSelectionScreen
              onSelectCourse={handleSelectCourse}
              activeSessionLabel={hasActiveSession ? activeSessionLabel : null}
              onResume={handleResumeSession}
            />
          )}

          {appState === AppState.SETUP && selectedCourse && (
            <SetupScreen
              course={selectedCourse}
              onStart={startQuiz}
              onBack={handleBackToCourses}
              activeSessionLabel={
                hasActiveSession && selectedCourse.id === selectedCourse.id
                  ? activeSessionLabel
                  : null
              }
              onResume={handleResumeSession}
            />
          )}

          {appState === AppState.LOADING && <LoadingScreen />}

          {appState === AppState.ACTIVE && quizExpiryTime && (
            <QuizActive
              questions={questions}
              onComplete={handleQuizComplete}
              sessionTitle={currentSession}
              expiryTime={quizExpiryTime}
              initialAnswers={userAnswers}
            />
          )}

          {appState === AppState.REVIEW && (
            <ResultDashboard
              questions={questions}
              answers={userAnswers}
              onRetry={handleRetry}
              onHome={handleHome}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
