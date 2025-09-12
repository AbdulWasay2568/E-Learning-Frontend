export interface Enrollment {
  id: number;
  createdAt: string;
  userId: number;
  courseId: number;
}

export interface CreateEnrollmentDto {
  userId: number;
  courseId: number;
}

export interface UpdateEnrollmentDto {
  userId?: number;
  courseId?: number;
} 