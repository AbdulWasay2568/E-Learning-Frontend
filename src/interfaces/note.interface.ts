export interface Note {
  id: number;
  summary: string;
  createdAt: string;
  lectureId: number;
  userId: number;
}

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