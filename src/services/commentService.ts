import { apiClient } from './axios';
import type { CreateCommentDto, UpdateCommentDto } from '../interfaces/comment.interface';

export const fetchComments = async () => {
  try {
    const res = await apiClient.get('/comments');
    return res.data.comments;
  } catch (err) {
    console.error('Failed to fetch comments:', err);
    throw err;
  }
};

export const fetchCommentById = async (id: number) => {
  try {
    const res = await apiClient.get(`/comments/${id}`);
    return res.data.comment;
  } catch (err) {
    console.error(`Failed to fetch comment ${id}:`, err);
    throw err;
  }
};

export const createComment = async (data: CreateCommentDto) => {
  try {
    const res = await apiClient.post('/comments', data);
    return res.data.comment;
  } catch (err) {
    console.error('Failed to create comment:', err);
    throw err;
  }
};

export const updateComment = async (id: number, data: UpdateCommentDto) => {
  try {
    const res = await apiClient.put(`/comments/${id}`, data);
    return res.data.comment;
  } catch (err) {
    console.error(`Failed to update comment ${id}:`, err);
    throw err;
  }
};

export const deleteComment = async (id: number) => {
  try {
    const res = await apiClient.delete(`/comments/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete comment ${id}:`, err);
    throw err;
  }
};

export const fetchCommentsByLecture = async (lectureId: number) => {
  try {
    const res = await apiClient.get(`/comments/lecture/${lectureId}`);
    return res.data.comments;
  } catch (err) {
    console.error(`Failed to fetch comments for lecture ${lectureId}:`, err);
    throw err;
  }
};

export const fetchCommentsByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/comments/user/${userId}`);
    return res.data.comments;
  } catch (err) {
    console.error(`Failed to fetch comments for user ${userId}:`, err);
    throw err;
  }
};

export const fetchCommentReplies = async (parentId: number) => {
  try {
    const res = await apiClient.get(`/comments/replies/${parentId}`);
    return res.data.replies;
  } catch (err) {
    console.error(`Failed to fetch replies for comment ${parentId}:`, err);
    throw err;
  }
}; 