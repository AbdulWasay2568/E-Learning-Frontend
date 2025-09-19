import { Router } from 'express';
import * as groupController from '../controllers/group.controller';

const groupRouter = Router();

groupRouter.post('/', groupController.createGroup);
groupRouter.get('/', groupController.getAllGroups);
groupRouter.get('/:id', groupController.getGroupById);
groupRouter.put('/:id', groupController.updateGroup);
groupRouter.delete('/:id', groupController.deleteGroup);

export default groupRouter; 