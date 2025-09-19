export interface CreateLectureDto {
  title: string;
  description: string;
  videoUrl: string;
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