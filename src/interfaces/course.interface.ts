export interface Course {
  id: number;
  title: string;
  description?: string;
  thumbnail?: string;
  createdAt: string;
  updatedAt: string;
  teacherId: number;
}

export interface CreateCourseDto {
  title: string;
  description?: string;
  teacherId: number;
}

export interface UpdateCourseDto {
  title?: string;
  description?: string;
  thumbnail?: string;
  teacherId?: number;
} 