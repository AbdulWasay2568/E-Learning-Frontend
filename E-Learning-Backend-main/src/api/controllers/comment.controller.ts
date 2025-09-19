import { Request, Response } from 'express';
import * as commentService from '../services/comment.service';

export const createComment = async (req: Request, res: Response) => {
  try {
    const comment = await commentService.createComment(req.body);
    res.status(201).json({ comment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentById = async (req: Request, res: Response) => {
  try {
    const commentId = Number(req.params.id);
    const comment = await commentService.getCommentById(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json({ comment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllComments = async (_req: Request, res: Response) => {
  try {
    const comments = await commentService.getAllComments();
    res.json({ comments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComment = async (req: Request, res: Response) => {
  try {
    const commentId = Number(req.params.id);
    const comment = await commentService.updateComment(commentId, req.body);
    res.json({ comment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    await commentService.deleteComment(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsByLecture = async (req: Request, res: Response) => {
  try {
    const lectureId = Number(req.params.lectureId);
    const comments = await commentService.getCommentsByLecture(lectureId);
    res.json({ comments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentsByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const comments = await commentService.getCommentsByUser(userId);
    res.json({ comments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCommentReplies = async (req: Request, res: Response) => {
  try {
    const parentId = Number(req.params.parentId);
    const replies = await commentService.getCommentReplies(parentId);
    res.json({ replies });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 