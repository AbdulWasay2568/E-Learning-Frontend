export enum GroupRole {
  Admin = "Admin",
  Member = "Member"
}

export interface GroupMember {
  id: number;
  role: GroupRole;
  userId: number;
  groupId: number;
}

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