import { Router } from 'express';
import * as usersController from '../controllers/user.controller';

const usersRouter = Router();

usersRouter.post('/', usersController.createUser);
usersRouter.get('/', usersController.getAllUsers);
usersRouter.get('/:id', usersController.getUserById);
usersRouter.put('/:id', usersController.updateUser);
usersRouter.delete('/:id', usersController.deleteUser);

export default usersRouter; 