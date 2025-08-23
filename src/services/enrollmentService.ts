import { apiClient } from './axios';
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from '../interfaces/enrollment.interface';

export const fetchEnrollments = async () => {
  try {
    const res = await apiClient.get('/enrollments');
    return res.data.enrollments;
  } catch (err) {
    console.error('Failed to fetch enrollments:', err);
    throw err;
  }
};

export const fetchEnrollmentById = async (id: number) => {
  try {
    const res = await apiClient.get(`/enrollments/${id}`);
    return res.data.enrollment;
  } catch (err) {
    console.error(`Failed to fetch enrollment ${id}:`, err);
    throw err;
  }
};

export const createEnrollment = async (data: CreateEnrollmentDto) => {
  try {
    const res = await apiClient.post('/enrollments', data);
    return res.data.enrollment;
  } catch (err) {
    console.error('Failed to create enrollment:', err);
    throw err;
  }
};

export const updateEnrollment = async (id: number, data: UpdateEnrollmentDto) => {
  try {
    const res = await apiClient.put(`/enrollments/${id}`, data);
    return res.data.enrollment;
  } catch (err) {
    console.error(`Failed to update enrollment ${id}:`, err);
    throw err;
  }
};

export const deleteEnrollment = async (id: number) => {
  try {
    const res = await apiClient.delete(`/enrollments/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete enrollment ${id}:`, err);
    throw err;
  }
};

export const fetchEnrollmentsByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/enrollments/user/${userId}`);
    return res.data.enrollments;
  } catch (err) {
    console.error(`Failed to fetch enrollments for user ${userId}:`, err);
    throw err;
  }
};

export const fetchEnrollmentsByCourse = async (courseId: number) => {
  try {
    const res = await apiClient.get(`/enrollments/course/${courseId}`);
    return res.data.enrollments;
  } catch (err) {
    console.error(`Failed to fetch enrollments for course ${courseId}:`, err);
    throw err;
  }
};

export const checkEnrollment = async (userId: number, courseId: number) => {
  try {
    const res = await apiClient.get(`/enrollments/check/${userId}/${courseId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to check enrollment for user ${userId} and course ${courseId}:`, err);
    throw err;
  }
}; 