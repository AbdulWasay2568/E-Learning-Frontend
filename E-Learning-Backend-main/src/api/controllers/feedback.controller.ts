import { Request, Response } from 'express';
import * as feedbackService from '../services/feedback.service';

export const createFeedback = async (req: Request, res: Response) => {
  try {
    const feedback = await feedbackService.createFeedback(req.body);
    res.status(201).json({ feedback });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeedbackById = async (req: Request, res: Response) => {
  try {
    const feedbackId = Number(req.params.id);
    const feedback = await feedbackService.getFeedbackById(feedbackId);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ feedback });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllFeedbacks = async (_req: Request, res: Response) => {
  try {
    const feedbacks = await feedbackService.getAllFeedbacks();
    res.json({ feedbacks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateFeedback = async (req: Request, res: Response) => {
  try {
    const feedbackId = Number(req.params.id);
    const feedback = await feedbackService.updateFeedback(feedbackId, req.body);
    res.json({ feedback });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteFeedback = async (req: Request, res: Response) => {
  try {
    await feedbackService.deleteFeedback(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeedbacksByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    const feedbacks = await feedbackService.getFeedbacksByCourse(courseId);
    res.json({ feedbacks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getFeedbacksByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const feedbacks = await feedbackService.getFeedbacksByUser(userId);
    res.json({ feedbacks });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAverageRatingByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    const ratingData = await feedbackService.getAverageRatingByCourse(courseId);
    res.json({ ratingData });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 