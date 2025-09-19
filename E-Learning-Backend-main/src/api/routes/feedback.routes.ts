import { Router } from 'express';
import * as feedbackController from '../controllers/feedback.controller';

const feedbackRouter = Router();

feedbackRouter.post('/', feedbackController.createFeedback);
feedbackRouter.get('/', feedbackController.getAllFeedbacks);
feedbackRouter.get('/:id', feedbackController.getFeedbackById);
feedbackRouter.put('/:id', feedbackController.updateFeedback);
feedbackRouter.delete('/:id', feedbackController.deleteFeedback);

feedbackRouter.get('/course/:courseId', feedbackController.getFeedbacksByCourse);
feedbackRouter.get('/user/:userId', feedbackController.getFeedbacksByUser);
feedbackRouter.get('/course/:courseId/rating', feedbackController.getAverageRatingByCourse);

export default feedbackRouter; 