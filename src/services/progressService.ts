import { apiClient } from './axios';
import type { CreateProgressDto, UpdateProgressDto } from '../interfaces/progress.interface';

export const fetchProgress = async () => {
  try {
    const res = await apiClient.get('/progress');
    return res.data.progress;
  } catch (err) {
    console.error('Failed to fetch progress:', err);
    throw err;
  }
};

export const fetchProgressById = async (id: number) => {
  try {
    const res = await apiClient.get(`/progress/${id}`);
    return res.data.progress;
  } catch (err) {
    console.error(`Failed to fetch progress ${id}:`, err);
    throw err;
  }
};

export const createProgress = async (data: CreateProgressDto) => {
  try {
    const res = await apiClient.post('/progress', data);
    return res.data.progress;
  } catch (err) {
    console.error('Failed to create progress:', err);
    throw err;
  }
};

export const updateProgress = async (id: number, data: UpdateProgressDto) => {
  try {
    const res = await apiClient.put(`/progress/${id}`, data);
    return res.data.progress;
  } catch (err) {
    console.error(`Failed to update progress ${id}:`, err);
    throw err;
  }
};

export const deleteProgress = async (id: number) => {
  try {
    const res = await apiClient.delete(`/progress/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete progress ${id}:`, err);
    throw err;
  }
};

export const fetchProgressByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/progress/user/${userId}`);
    return res.data.progress;
  } catch (err) {
    console.error(`Failed to fetch progress for user ${userId}:`, err);
    throw err;
  }
};

export const fetchProgressByLecture = async (lectureId: number) => {
  try {
    const res = await apiClient.get(`/progress/lecture/${lectureId}`);
    return res.data.progress;
  } catch (err) {
    console.error(`Failed to fetch progress for lecture ${lectureId}:`, err);
    throw err;
  }
};

export const fetchProgressByUserAndLecture = async (userId: number, lectureId: number) => {
  try {
    const res = await apiClient.get(`/progress/user/${userId}/lecture/${lectureId}`);
    return res.data.progress;
  } catch (err) {
    console.error(`Failed to fetch progress for user ${userId} and lecture ${lectureId}:`, err);
    throw err;
  }
}; 