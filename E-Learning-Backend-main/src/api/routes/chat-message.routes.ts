import { Router } from 'express';
import * as chatMessageController from '../controllers/chat-message.controller';

const chatMessageRouter = Router();

chatMessageRouter.post('/', chatMessageController.createChatMessage);
chatMessageRouter.get('/', chatMessageController.getAllChatMessages);
chatMessageRouter.get('/:id', chatMessageController.getChatMessageById);
chatMessageRouter.put('/:id', chatMessageController.updateChatMessage);
chatMessageRouter.delete('/:id', chatMessageController.deleteChatMessage);

chatMessageRouter.get('/group/:groupId', chatMessageController.getChatMessagesByGroup);
chatMessageRouter.get('/user/:userId', chatMessageController.getChatMessagesByUser);

export default chatMessageRouter; 