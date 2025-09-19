export interface CreateCommentDto {
  comment: string;
  lectureId?: number;
  userId: number;
  parentId?: number;
}

export interface UpdateCommentDto {
  comment?: string;
  lectureId?: number;
  userId?: number;
  parentId?: number;
} 