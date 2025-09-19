export interface Group {
  id: number;
  name: string;
  createdAt: string;
}

// export interface CreateGroupDto {
//   name: string;
// }

export interface CreateGroupDto {
  name: string;
  section?: string; // optional
  room?: string;    // optional
}


export interface UpdateGroupDto {
  name?: string;
} 