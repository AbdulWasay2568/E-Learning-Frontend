import { apiClient } from './axios';
import type { CreateNoteDto, UpdateNoteDto } from '../interfaces/note.interface';

export const fetchNotes = async () => {
  try {
    const res = await apiClient.get('/notes');
    return res.data.notes;
  } catch (err) {
    console.error('Failed to fetch notes:', err);
    throw err;
  }
};

export const fetchNoteById = async (id: number) => {
  try {
    const res = await apiClient.get(`/notes/${id}`);
    return res.data.note;
  } catch (err) {
    console.error(`Failed to fetch note ${id}:`, err);
    throw err;
  }
};

export const createNote = async (data: CreateNoteDto) => {
  try {
    const res = await apiClient.post('/notes', data);
    return res.data.note;
  } catch (err) {
    console.error('Failed to create note:', err);
    throw err;
  }
};

export const updateNote = async (id: number, data: UpdateNoteDto) => {
  try {
    const res = await apiClient.put(`/notes/${id}`, data);
    return res.data.note;
  } catch (err) {
    console.error(`Failed to update note ${id}:`, err);
    throw err;
  }
};

export const deleteNote = async (id: number) => {
  try {
    const res = await apiClient.delete(`/notes/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete note ${id}:`, err);
    throw err;
  }
};

export const fetchNotesByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/notes/user/${userId}`);
    return res.data.notes;
  } catch (err) {
    console.error(`Failed to fetch notes for user ${userId}:`, err);
    throw err;
  }
};

export const fetchNotesByLecture = async (lectureId: number) => {
  try {
    const res = await apiClient.get(`/notes/lecture/${lectureId}`);
    return res.data.notes;
  } catch (err) {
    console.error(`Failed to fetch notes for lecture ${lectureId}:`, err);
    throw err;
  }
}; 