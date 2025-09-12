import { apiClient } from './axios';
import type { CreateGroupMemberDto, UpdateGroupMemberDto } from '../interfaces/group-member.interface';

export const fetchGroupMembers = async () => {
  try {
    const res = await apiClient.get('/group-members');
    return res.data.groupMembers;
  } catch (err) {
    console.error('Failed to fetch group members:', err);
    throw err;
  }
};

export const fetchGroupMemberById = async (id: number) => {
  try {
    const res = await apiClient.get(`/group-members/${id}`);
    return res.data.groupMember;
  } catch (err) {
    console.error(`Failed to fetch group member ${id}:`, err);
    throw err;
  }
};

export const createGroupMember = async (data: CreateGroupMemberDto) => {
  try {
    const res = await apiClient.post('/group-members', data);
    return res.data.groupMember;
  } catch (err) {
    console.error('Failed to create group member:', err);
    throw err;
  }
};

export const updateGroupMember = async (id: number, data: UpdateGroupMemberDto) => {
  try {
    const res = await apiClient.put(`/group-members/${id}`, data);
    return res.data.groupMember;
  } catch (err) {
    console.error(`Failed to update group member ${id}:`, err);
    throw err;
  }
};

export const deleteGroupMember = async (id: number) => {
  try {
    const res = await apiClient.delete(`/group-members/${id}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to delete group member ${id}:`, err);
    throw err;
  }
};

export const fetchGroupMembersByGroup = async (groupId: number) => {
  try {
    const res = await apiClient.get(`/group-members/group/${groupId}`);
    return res.data.groupMembers;
  } catch (err) {
    console.error(`Failed to fetch group members for group ${groupId}:`, err);
    throw err;
  }
};

export const fetchGroupMembersByUser = async (userId: number) => {
  try {
    const res = await apiClient.get(`/group-members/user/${userId}`);
    return res.data.groupMembers;
  } catch (err) {
    console.error(`Failed to fetch group members for user ${userId}:`, err);
    throw err;
  }
};

export const checkGroupMembership = async (userId: number, groupId: number) => {
  try {
    const res = await apiClient.get(`/group-members/check/${userId}/${groupId}`);
    return res.data;
  } catch (err) {
    console.error(`Failed to check group membership for user ${userId} and group ${groupId}:`, err);
    throw err;
  }
}; 