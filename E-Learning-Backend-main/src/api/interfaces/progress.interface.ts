export interface CreateProgressDto {
  completed?: boolean;
  percentage?: number;
  lastWatched?: number;
  userId: number;
  lectureId: number;
}

export interface UpdateProgressDto {
  completed?: boolean;
  percentage?: number;
  lastWatched?: number;
  userId?: number;
  lectureId?: number;
} 