export interface Lecture {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  duration: string;
  courseId: number;
}

export interface CreateLectureDto {
  title: string;
  description: string;
  video: File;
  duration: string;
  courseId: number;
}

export interface UpdateLectureDto {
  title?: string;
  description?: string;
  videoUrl?: string;
  duration?: string;
  courseId?: number;
} 