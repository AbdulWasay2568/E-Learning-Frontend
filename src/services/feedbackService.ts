import { apiClient } from './axios';
import type { CreateFeedbackDto, UpdateFeedbackDto } from '../interfaces/feedback.interface';

export const fetchFeedbacks = async () => {
  try {
    const res = await apiClient.get('/feedbacks');
    return res.data.feedbacks;
  } catch (err) {
    console.error('Failed to fetch feedbacks:', err);
    throw err;
  }
};

export const fetchFeedbackById = async (id: number) => {
  try {
    const res = await apiClient.get(`/feedbacks/${id}`);
    return res.data.feedback;
  } catch (err) {
    console.error(`Failed to fetch feedback ${id}:`, err);
    throw err;
  }
};

export const createFeedback = async (data: CreateFeedbackDto) => {
  try {
    const res = await apiClient.post('/feedbacks', data);
    return res.data.feedback;
  } catch (err) {
    console.error('Failed to create feedback:', err);
    throw err;
  }
};

export const updateFeedback = async (id: number, data: UpdateFeedbackDto) => {
  try {
    const res = await apiClient.put(`/feedbacks/${id}`, data);
    return res.data.feedback;
  } catch (err) {
    console.error(`Failed to update feedback ${id}:`, err);
    throw err;
  }
};

export const deleteFeedback = async (id: number) => {
  try {
    const res = await apiClient.delete(`/feedbacks/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete feedback ${id}:`, err);
    throw err;
  }
};

export const fetchFeedbacksByCourse = async (courseId: number) => {
  try {
    const res = await apiClient.get(`/feedbacks/course/${courseId}`);
    return res.data.feedbacks;
  } catch (err) {
    console.error(`Failed to fetch feedbacks for course ${courseId}:`, err);
    throw err;
  }
};

export const fetchFeedbacksByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/feedbacks/user/${userId}`);
    return res.data.feedbacks;
  } catch (err) {
    console.error(`Failed to fetch feedbacks for user ${userId}:`, err);
    throw err;
  }
};

export const getAverageRatingByCourse = async (courseId: number) => {
  try {
    const res = await apiClient.get(`/feedbacks/course/${courseId}/rating`);
    return res.data.ratingData;
  } catch (err) {
    console.error(`Failed to get average rating for course ${courseId}:`, err);
    throw err;
  }
}; 