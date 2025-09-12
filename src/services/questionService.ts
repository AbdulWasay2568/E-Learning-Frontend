import { apiClient } from './axios';
import type { CreateQuestionDto, UpdateQuestionDto } from '../interfaces/question.interface';

export const fetchQuestions = async () => {
  try {
    const res = await apiClient.get('/questions');
    return res.data.questions;
  } catch (err) {
    console.error('Failed to fetch questions:', err);
    throw err;
  }
};

export const fetchQuestionById = async (id: number) => {
  try {
    const res = await apiClient.get(`/questions/${id}`);
    return res.data.question;
  } catch (err) {
    console.error(`Failed to fetch question ${id}:`, err);
    throw err;
  }
};

export const createQuestion = async (data: CreateQuestionDto) => {
  try {
    const res = await apiClient.post('/questions', data);
    return res.data.question;
  } catch (err) {
    console.error('Failed to create question:', err);
    throw err;
  }
};

export const updateQuestion = async (id: number, data: UpdateQuestionDto) => {
  try {
    const res = await apiClient.put(`/questions/${id}`, data);
    return res.data.question;
  } catch (err) {
    console.error(`Failed to update question ${id}:`, err);
    throw err;
  }
};

export const deleteQuestion = async (id: number) => {
  try {
    const res = await apiClient.delete(`/questions/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete question ${id}:`, err);
    throw err;
  }
};

export const fetchQuestionsByQuiz = async (quizId: number) => {
  try {
    const res = await apiClient.get(`/questions/quiz/${quizId}`);
    return res.data.questions;
  } catch (err) {
    console.error(`Failed to fetch questions for quiz ${quizId}:`, err);
    throw err;
  }
}; 