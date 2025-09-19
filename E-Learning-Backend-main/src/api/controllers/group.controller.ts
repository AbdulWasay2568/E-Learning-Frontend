import { Request, Response } from 'express';
import * as groupService from '../services/group.service';

export const createGroup = async (req: Request, res: Response) => {
  try {
    const group = await groupService.createGroup(req.body);
    res.status(201).json({ group });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getGroupById = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.id);
    const group = await groupService.getGroupById(groupId);
    if (!group) return res.status(404).json({ message: 'Group not found' });
    res.json({ group });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllGroups = async (_req: Request, res: Response) => {
  try {
    const groups = await groupService.getAllGroups();
    res.json({ groups });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateGroup = async (req: Request, res: Response) => {
  try {
    const groupId = Number(req.params.id);
    const group = await groupService.updateGroup(groupId, req.body);
    res.json({ group });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteGroup = async (req: Request, res: Response) => {
  try {
    await groupService.deleteGroup(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 