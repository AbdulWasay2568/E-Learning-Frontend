import { Request, Response } from 'express';
import * as noteService from '../services/note.service';

export const createNote = async (req: Request, res: Response) => {
  try {
    const note = await noteService.createNote(req.body);
    res.status(201).json({ note });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getNoteById = async (req: Request, res: Response) => {
  try {
    const noteId = Number(req.params.id);
    const note = await noteService.getNoteById(noteId);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json({ note });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllNotes = async (_req: Request, res: Response) => {
  try {
    const notes = await noteService.getAllNotes();
    res.json({ notes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateNote = async (req: Request, res: Response) => {
  try {
    const noteId = Number(req.params.id);
    const note = await noteService.updateNote(noteId, req.body);
    res.json({ note });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteNote = async (req: Request, res: Response) => {
  try {
    await noteService.deleteNote(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getNotesByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const notes = await noteService.getNotesByUser(userId);
    res.json({ notes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getNotesByLecture = async (req: Request, res: Response) => {
  try {
    const lectureId = Number(req.params.lectureId);
    const notes = await noteService.getNotesByLecture(lectureId);
    res.json({ notes });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 