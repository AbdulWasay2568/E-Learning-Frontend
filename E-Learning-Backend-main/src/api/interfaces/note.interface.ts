export interface CreateNoteDto {
  summary: string;
  lectureId: number;
  userId: number;
}

export interface UpdateNoteDto {
  summary?: string;
  lectureId?: number;
  userId?: number;
} 