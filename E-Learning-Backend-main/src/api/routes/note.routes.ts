import { Router } from 'express';
import * as noteController from '../controllers/note.controller';

const noteRouter = Router();

noteRouter.post('/', noteController.createNote);
noteRouter.get('/', noteController.getAllNotes);
noteRouter.get('/:id', noteController.getNoteById);
noteRouter.put('/:id', noteController.updateNote);
noteRouter.delete('/:id', noteController.deleteNote);

noteRouter.get('/user/:userId', noteController.getNotesByUser);
noteRouter.get('/lecture/:lectureId', noteController.getNotesByLecture);

export default noteRouter; 