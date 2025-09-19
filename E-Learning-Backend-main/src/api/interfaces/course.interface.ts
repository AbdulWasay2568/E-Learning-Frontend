export interface CreateCourseDto {
  title: string;
  description?: string;
  thumbnail?: string;
  teacherId: number;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  thumbnail?: string;
  teacherId?: number;
} 