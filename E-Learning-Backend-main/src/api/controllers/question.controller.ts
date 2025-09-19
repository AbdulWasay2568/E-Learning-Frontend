import { Request, Response } from 'express';
import * as questionService from '../services/question.service';

export const createQuestion = async (req: Request, res: Response) => {
  try {
    const question = await questionService.createQuestion(req.body);
    res.status(201).json({ question });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuestionById = async (req: Request, res: Response) => {
  try {
    const questionId = Number(req.params.id);
    const question = await questionService.getQuestionById(questionId);
    if (!question) return res.status(404).json({ message: 'Question not found' });
    res.json({ question });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllQuestions = async (_req: Request, res: Response) => {
  try {
    const questions = await questionService.getAllQuestions();
    res.json({ questions });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateQuestion = async (req: Request, res: Response) => {
  try {
    const questionId = Number(req.params.id);
    const question = await questionService.updateQuestion(questionId, req.body);
    res.json({ question });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteQuestion = async (req: Request, res: Response) => {
  try {
    await questionService.deleteQuestion(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getQuestionsByQuiz = async (req: Request, res: Response) => {
  try {
    const quizId = Number(req.params.quizId);
    const questions = await questionService.getQuestionsByQuiz(quizId);
    res.json({ questions });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 