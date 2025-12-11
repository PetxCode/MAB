export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string; // The text of the correct option
  explanation?: string;
}

export interface QuizConfig {
  module: string;
  session: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  timeTaken: number; // in seconds
}

export interface CourseModule {
  id: string;
  title: string;
  sessions: string[];
}

export interface Course {
  id: string;
  code: string;
  title: string;
}

export enum AppState {
  COURSE_SELECTION = 'COURSE_SELECTION',
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  ACTIVE = 'ACTIVE',
  REVIEW = 'REVIEW',
}

export type UserAnswers = Record<string, string>; // questionId -> selectedOption