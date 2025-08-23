export interface Lecture {
  id: number;
  title: string;
  videoUrl: string;
  duration: number;
  createdAt: string;
  courseId: number;
}

export interface CreateLectureDto {
  title: string;
  videoUrl: string;
  duration: number;
  courseId: number;
}

export interface UpdateLectureDto {
  title?: string;
  videoUrl?: string;
  duration?: number;
  courseId?: number;
} 