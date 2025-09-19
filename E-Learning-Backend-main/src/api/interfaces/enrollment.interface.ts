export interface CreateEnrollmentDto {
  userId: number;
  courseId: number;
}

export interface UpdateEnrollmentDto {
  userId?: number;
  courseId?: number;
} 