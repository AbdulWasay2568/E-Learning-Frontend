import { Router } from 'express';
import * as enrollmentController from '../controllers/enrollment.controller';

const enrollmentRouter = Router();

enrollmentRouter.post('/', enrollmentController.createEnrollment);
enrollmentRouter.get('/', enrollmentController.getAllEnrollments);
enrollmentRouter.get('/:id', enrollmentController.getEnrollmentById);
enrollmentRouter.put('/:id', enrollmentController.updateEnrollment);
enrollmentRouter.delete('/:id', enrollmentController.deleteEnrollment);

enrollmentRouter.get('/user/:userId', enrollmentController.getEnrollmentsByUser);
enrollmentRouter.get('/course/:courseId', enrollmentController.getEnrollmentsByCourse);
enrollmentRouter.get('/check/:userId/:courseId', enrollmentController.checkEnrollment);

export default enrollmentRouter; 