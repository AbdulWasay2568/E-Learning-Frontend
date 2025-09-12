export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  courseId: number;
  userId: number;
}

export interface CreateQuizDto {
  title: string;
  courseId: number;
  userId: number;
}

export interface UpdateQuizDto {
  title?: string;
  courseId?: number;
  userId?: number;
} 