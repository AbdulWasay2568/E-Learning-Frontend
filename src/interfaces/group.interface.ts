export interface Group {
  id: number;
  name: string;
  createdAt: string;
}

<<<<<<< HEAD
// export interface CreateGroupDto {
//   name: string;
// }

export interface CreateGroupDto {
  name: string;
  section?: string; // optional
  room?: string;    // optional
}


=======
export interface CreateGroupDto {
  name: string;
}

>>>>>>> 3dd66d0530c4868e3aad4d0c1c27fd4eda5e7d53
export interface UpdateGroupDto {
  name?: string;
} 