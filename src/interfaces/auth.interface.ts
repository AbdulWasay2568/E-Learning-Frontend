import { Role } from "./enums.interface";

export interface RegisterUserInput {
    email: string;
    username: string;
    password: string;
    role: Role;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

