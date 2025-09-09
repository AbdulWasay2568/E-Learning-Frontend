import { apiClient } from './axios';
import type { CreateLectureDto, UpdateLectureDto } from '../interfaces/lecture.interface';

export const fetchLectures = async () => {
  try {
    const res = await apiClient.get('/lectures');
    return res.data.lectures;
  } catch (err) {
    console.error('Failed to fetch lectures:', err);
    throw err;
  }
};

export const fetchLectureById = async (id: number) => {
  try {
    const res = await apiClient.get(`/lectures/${id}`);
    return res.data.lecture;
  } catch (err) {
    console.error(`Failed to fetch lecture ${id}:`, err);
    throw err;
  }
};

export const createLecture = async (data: CreateLectureDto) => {
  try {
    const formData = new FormData();
    const { title, description, duration, courseId, video } = data;
    formData.append("data", JSON.stringify({ title, description, duration, courseId }));
    
    // Append the actual video file
    formData.append("video", video);

    const res = await apiClient.post("/lectures", formData);

    return res.data;
  } catch (err) {
    console.error("Failed to create lecture:", err);
    throw err;
  }
};

export const updateLecture = async (id: number, data: UpdateLectureDto) => {
  try {
    const res = await apiClient.put(`/lectures/${id}`, data);
    return res.data.lecture;
  } catch (err) {
    console.error(`Failed to update lecture ${id}:`, err);
    throw err;
  }
};

export const deleteLecture = async (id: number) => {
  try {
    const res = await apiClient.delete(`/lectures/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete lecture ${id}:`, err);
    throw err;
  }
};

export const fetchLecturesByCourse = async (courseId: number) => {
  try {
    const res = await apiClient.get(`/lectures/course/${courseId}`);
    return res.data.lectures;
  } catch (err) {
    console.error(`Failed to fetch lectures for course ${courseId}:`, err);
    throw err;
  }
}; 