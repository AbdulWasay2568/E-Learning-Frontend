import { apiClient } from './axios';
import type { CreateQuizDto, UpdateQuizDto } from '../interfaces/quiz.interface';

export const fetchQuizzes = async () => {
  try {
    const res = await apiClient.get('/quizzes');
    return res.data.quizzes;
  } catch (err) {
    console.error('Failed to fetch quizzes:', err);
    throw err;
  }
};

export const fetchQuizById = async (id: number) => {
  try {
    const res = await apiClient.get(`/quizzes/${id}`);
    return res.data.quiz;
  } catch (err) {
    console.error(`Failed to fetch quiz ${id}:`, err);
    throw err;
  }
};

export const createQuiz = async (data: CreateQuizDto) => {
  try {
    const res = await apiClient.post('/quizzes', data);
    return res.data.quiz;
  } catch (err) {
    console.error('Failed to create quiz:', err);
    throw err;
  }
};

export const updateQuiz = async (id: number, data: UpdateQuizDto) => {
  try {
    const res = await apiClient.put(`/quizzes/${id}`, data);
    return res.data.quiz;
  } catch (err) {
    console.error(`Failed to update quiz ${id}:`, err);
    throw err;
  }
};

export const deleteQuiz = async (id: number) => {
  try {
    const res = await apiClient.delete(`/quizzes/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete quiz ${id}:`, err);
    throw err;
  }
};

export const fetchQuizzesByCourse = async (courseId: number) => {
  try {
    const res = await apiClient.get(`/quizzes/course/${courseId}`);
    return res.data.quizzes;
  } catch (err) {
    console.error(`Failed to fetch quizzes for course ${courseId}:`, err);
    throw err;
  }
};

export const fetchQuizzesByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/quizzes/user/${userId}`);
    return res.data.quizzes;
  } catch (err) {
    console.error(`Failed to fetch quizzes for user ${userId}:`, err);
    throw err;
  }
}; 