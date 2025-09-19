import { Request, Response } from 'express';
import * as chatMessageService from '../services/chat-message.service';

export const createChatMessage = async (req: Request, res: Response) => {
  try {
    const chatMessage = await chatMessageService.createChatMessage(req.body);
    res.status(201).json({ chatMessage });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getChatMessageById = async (req: Request, res: Response) => {
  try {
    const chatMessageId = Number(req.params.id);
    const chatMessage = await chatMessageService.getChatMessageById(chatMessageId);
    if (!chatMessage) return res.status(404).json({ message: 'Chat message not found' });
    res.json({ chatMessage });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllChatMessages = async (_req: Request, res: Response) => {
  try {
    const chatMessages = await chatMessageService.getAllChatMessages();
    res.json({ chatMessages });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateChatMessage = async (req: Request, res: Response) => {
  try {
    const chatMessageId = Number(req.params.id);
    const chatMessage = await chatMessageService.updateChatMessage(chatMessageId, req.body);
    res.json({ chatMessage });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteChatMessage = async (req: Request, res: Response) => {
  try {
    await chatMessageService.deleteChatMessage(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getChatMessagesByGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const chatMessages = await chatMessageService.getChatMessagesByGroup(groupId);
    res.json({ chatMessages });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getChatMessagesByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const chatMessages = await chatMessageService.getChatMessagesByUser(userId);
    res.json({ chatMessages });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 