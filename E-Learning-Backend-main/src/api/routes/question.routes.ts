import { Router } from 'express';
import * as questionController from '../controllers/question.controller';

const questionRouter = Router();

questionRouter.post('/', questionController.createQuestion);
questionRouter.get('/', questionController.getAllQuestions);
questionRouter.get('/:id', questionController.getQuestionById);
questionRouter.put('/:id', questionController.updateQuestion);
questionRouter.delete('/:id', questionController.deleteQuestion);

questionRouter.get('/quiz/:quizId', questionController.getQuestionsByQuiz);

export default questionRouter; 