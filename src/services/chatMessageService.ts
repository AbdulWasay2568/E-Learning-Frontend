import { apiClient } from './axios';
import type { CreateChatMessageDto, UpdateChatMessageDto } from '../interfaces/chat-message.interface';

export const fetchChatMessages = async () => {
  try {
    const res = await apiClient.get('/chat-messages');
    return res.data.chatMessages;
  } catch (err) {
    console.error('Failed to fetch chat messages:', err);
    throw err;
  }
};

export const fetchChatMessageById = async (id: number) => {
  try {
    const res = await apiClient.get(`/chat-messages/${id}`);
    return res.data.chatMessage;
  } catch (err) {
    console.error(`Failed to fetch chat message ${id}:`, err);
    throw err;
  }
};

export const createChatMessage = async (data: CreateChatMessageDto) => {
  try {
    const res = await apiClient.post('/chat-messages', data);
    return res.data.chatMessage;
  } catch (err) {
    console.error('Failed to create chat message:', err);
    throw err;
  }
};

export const updateChatMessage = async (id: number, data: UpdateChatMessageDto) => {
  try {
    const res = await apiClient.put(`/chat-messages/${id}`, data);
    return res.data.chatMessage;
  } catch (err) {
    console.error(`Failed to update chat message ${id}:`, err);
    throw err;
  }
};

export const deleteChatMessage = async (id: number) => {
  try {
    const res = await apiClient.delete(`/chat-messages/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete chat message ${id}:`, err);
    throw err;
  }
};

export const fetchChatMessagesByGroup = async (groupId: number) => {
  try {
    const res = await apiClient.get(`/chat-messages/group/${groupId}`);
    return res.data.chatMessages;
  } catch (err) {
    console.error(`Failed to fetch chat messages for group ${groupId}:`, err);
    throw err;
  }
};

export const fetchChatMessagesByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/chat-messages/user/${userId}`);
    return res.data.chatMessages;
  } catch (err) {
    console.error(`Failed to fetch chat messages for user ${userId}:`, err);
    throw err;
  }
}; 