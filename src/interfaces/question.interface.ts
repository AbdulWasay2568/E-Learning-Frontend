export interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
  createdAt: string;
  quizId: number;
}

export interface CreateQuestionDto {
  question: string;
  options: string[];
  answer: string;
  quizId: number;
}

export interface UpdateQuestionDto {
  question?: string;
  options?: string[];
  answer?: string;
  quizId?: number;
} 