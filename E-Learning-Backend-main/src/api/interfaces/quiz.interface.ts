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