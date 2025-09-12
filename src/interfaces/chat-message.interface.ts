export interface ChatMessage {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  groupId?: number;
}

export interface CreateChatMessageDto {
  content: string;
  userId: number;
  groupId?: number;
}

export interface UpdateChatMessageDto {
  content?: string;
  userId?: number;
  groupId?: number;
} 