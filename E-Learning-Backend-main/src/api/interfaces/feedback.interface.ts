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