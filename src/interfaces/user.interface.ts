export enum Role {
  Admin = "Admin",
  Student = "Student"
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role?: Role;
  profileImage?: string;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: Role;
  profileImage?: string;
} 