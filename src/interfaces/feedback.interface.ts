export interface Feedback {
  id: number;
  rating: number;
  comment?: string;
  createdAt: string;
  courseId: number;
  userId: number;
}

export interface CreateFeedbackDto {
  rating: number;
  comment?: string;
  courseId: number;
  userId: number;
}

export interface UpdateFeedbackDto {
  rating?: number;
  comment?: string;
  courseId?: number;
  userId?: number;
} 