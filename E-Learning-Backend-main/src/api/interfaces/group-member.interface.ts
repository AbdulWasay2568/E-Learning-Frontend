import { GroupRole } from './enums.interface';

export interface CreateGroupMemberDto {
  role?: GroupRole;
  userId: number;
  groupId: number;
}

export interface UpdateGroupMemberDto {
  role?: GroupRole;
  userId?: number;
  groupId?: number;
} 