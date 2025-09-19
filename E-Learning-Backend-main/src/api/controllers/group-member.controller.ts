import { Request, Response } from 'express';
import * as groupMemberService from '../services/group-member.service';

export const createGroupMember = async (req: Request, res: Response) => {
  try {
    const groupMember = await groupMemberService.createGroupMember(req.body);
    res.status(201).json({ groupMember });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroupMemberById = async (req: Request, res: Response) => {
  try {
    const groupMemberId = Number(req.params.id);
    const groupMember = await groupMemberService.getGroupMemberById(groupMemberId);
    if (!groupMember) return res.status(404).json({ message: 'Group member not found' });
    res.json({ groupMember });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGroupMembers = async (_req: Request, res: Response) => {
  try {
    const groupMembers = await groupMemberService.getAllGroupMembers();
    res.json({ groupMembers });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGroupMember = async (req: Request, res: Response) => {
  try {
    const groupMemberId = Number(req.params.id);
    const groupMember = await groupMemberService.updateGroupMember(groupMemberId, req.body);
    res.json({ groupMember });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGroupMember = async (req: Request, res: Response) => {
  try {
    await groupMemberService.deleteGroupMember(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroupMembersByGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.groupId);
    const groupMembers = await groupMemberService.getGroupMembersByGroup(groupId);
    res.json({ groupMembers });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroupMembersByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const groupMembers = await groupMemberService.getGroupMembersByUser(userId);
    res.json({ groupMembers });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const checkGroupMembership = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const groupId = Number(req.params.groupId);
    const groupMember = await groupMemberService.checkGroupMembership(userId, groupId);
    res.json({ isMember: !!groupMember, groupMember });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 