import { apiClient } from './axios';
import type { CreateCourseDto, UpdateCourseDto } from '../interfaces/course.interface';

export const fetchCourses = async () => {
  try {
    const res = await apiClient.get('/courses');
    return res.data.courses;
  } catch (err) {
    console.error('Failed to fetch courses:', err);
    throw err;
  }
};

export const fetchCourseById = async (id: number) => {
  try {
    const res = await apiClient.get(`/courses/${id}`);
    return res.data.course;
  } catch (err) {
    console.error(`Failed to fetch course ${id}:`, err);
    throw err;
  }
};

export const createCourse = async (data: CreateCourseDto) => {
  try {
    const res = await apiClient.post('/courses', data);
    return res.data.course;
  } catch (err) {
    console.error('Failed to create course:', err);
    throw err;
  }
};

export const updateCourse = async (id: number, data: UpdateCourseDto) => {
  try {
    const res = await apiClient.put(`/courses/${id}`, data);
    return res.data.course;
  } catch (err) {
    console.error(`Failed to update course ${id}:`, err);
    throw err;
  }
};

export const deleteCourse = async (id: number) => {
  try {
    const res = await apiClient.delete(`/courses/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete course ${id}:`, err);
    throw err;
  }
};

export const fetchCoursesByTeacher = async (teacherId: number) => {
  try {
    const res = await apiClient.get(`/courses/teacher/${teacherId}`);
    return res.data.courses;
  } catch (err) {
    console.error(`Failed to fetch courses for teacher ${teacherId}:`, err);
    throw err;
  }
}; 