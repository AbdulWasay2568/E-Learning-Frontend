import { Router } from 'express';
import * as quizController from '../controllers/quiz.controller';

const quizRouter = Router();

quizRouter.post('/', quizController.createQuiz);
quizRouter.get('/', quizController.getAllQuizzes);
quizRouter.get('/:id', quizController.getQuizById);
quizRouter.put('/:id', quizController.updateQuiz);
quizRouter.delete('/:id', quizController.deleteQuiz);

quizRouter.get('/course/:courseId', quizController.getQuizzesByCourse);
quizRouter.get('/user/:userId', quizController.getQuizzesByUser);

export default quizRouter; 