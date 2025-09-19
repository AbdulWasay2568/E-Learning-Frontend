import { Router } from 'express';
import * as groupMemberController from '../controllers/group-member.controller';

const groupMemberRouter = Router();

groupMemberRouter.post('/', groupMemberController.createGroupMember);
groupMemberRouter.get('/', groupMemberController.getAllGroupMembers);
groupMemberRouter.get('/:id', groupMemberController.getGroupMemberById);
groupMemberRouter.put('/:id', groupMemberController.updateGroupMember);
groupMemberRouter.delete('/:id', groupMemberController.deleteGroupMember);

groupMemberRouter.get('/group/:groupId', groupMemberController.getGroupMembersByGroup);
groupMemberRouter.get('/user/:userId', groupMemberController.getGroupMembersByUser);
groupMemberRouter.get('/check/:userId/:groupId', groupMemberController.checkGroupMembership);

export default groupMemberRouter; 