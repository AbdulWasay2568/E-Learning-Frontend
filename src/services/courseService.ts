import { apiClient } from './axios';
import type { CreateCourseDto, UpdateCourseDto } from '../interfaces/course.interface';

export const createCourse = async (data: CreateCourseDto, imageFile: File) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('data', JSON.stringify(data));

    const res = await apiClient.post('/courses', formData);
    return res.data.course;
  } catch (err) {
    console.error('Failed to create course:', err);
    throw err;
  }
};

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

export const updateCourseById = async (
  id: number,
  data: UpdateCourseDto,
  imageFile?: File
) => {
  try {
    const formData = new FormData();

    if (imageFile) {
      formData.append("image", imageFile);
    }
    formData.append("data", JSON.stringify(data));

    const res = await apiClient.put(`/courses/${id}`, formData);
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