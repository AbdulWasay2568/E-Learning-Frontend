import { apiClient } from './axios';
import type { CreateGroupDto, UpdateGroupDto } from '../interfaces/group.interface';

export const fetchGroups = async () => {
  try {
    const res = await apiClient.get('/groups');
    return res.data.groups;
  } catch (err) {
    console.error('Failed to fetch groups:', err);
    throw err;
  }
};

export const fetchGroupById = async (id: number) => {
  try {
    const res = await apiClient.get(`/groups/${id}`);
    return res.data.group;
  } catch (err) {
    console.error(`Failed to fetch group ${id}:`, err);
    throw err;
  }
};

export const createGroup = async (data: CreateGroupDto) => {
  try {
    const res = await apiClient.post('/groups', data);
    return res.data.group;
  } catch (err) {
    console.error('Failed to create group:', err);
    throw err;
  }
};

export const updateGroup = async (id: number, data: UpdateGroupDto) => {
  try {
    const res = await apiClient.put(`/groups/${id}`, data);
    return res.data.group;
  } catch (err) {
    console.error(`Failed to update group ${id}:`, err);
    throw err;
  }
};

export const deleteGroup = async (id: number) => {
  try {
    const res = await apiClient.delete(`/groups/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete group ${id}:`, err);
    throw err;
  }
}; 