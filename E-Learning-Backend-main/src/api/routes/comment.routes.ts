import { Router } from 'express';
import * as commentController from '../controllers/comment.controller';

const commentRouter = Router();

commentRouter.post('/', commentController.createComment);
commentRouter.get('/', commentController.getAllComments);
commentRouter.get('/:id', commentController.getCommentById);
commentRouter.put('/:id', commentController.updateComment);
commentRouter.delete('/:id', commentController.deleteComment);

commentRouter.get('/lecture/:lectureId', commentController.getCommentsByLecture);
commentRouter.get('/user/:userId', commentController.getCommentsByUser);
commentRouter.get('/replies/:parentId', commentController.getCommentReplies);

export default commentRouter; 