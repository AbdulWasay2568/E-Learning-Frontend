export interface Group {
  id: number;
  name: string;
  createdAt: string;
}

export interface CreateGroupDto {
  name: string;
}

export interface UpdateGroupDto {
  name?: string;
} 