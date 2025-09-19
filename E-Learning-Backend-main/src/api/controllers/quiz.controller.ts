import { Request, Response } from 'express';
import * as quizService from '../services/quiz.service';

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await quizService.createQuiz(req.body);
    res.status(201).json({ quiz });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuizById = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await quizService.getQuizById(quizId);
    if (!quiz) return res.status(404).json({ message: 'Quiz not found' });
    res.json({ quiz });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllQuizzes = async (_req: Request, res: Response) => {
  try {
    const quizzes = await quizService.getAllQuizzes();
    res.json({ quizzes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.id);
    const quiz = await quizService.updateQuiz(quizId, req.body);
    res.json({ quiz });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    await quizService.deleteQuiz(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuizzesByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    const quizzes = await quizService.getQuizzesByCourse(courseId);
    res.json({ quizzes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuizzesByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const quizzes = await quizService.getQuizzesByUser(userId);
    res.json({ quizzes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 