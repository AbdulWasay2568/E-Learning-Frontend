import { Role } from "./enums.interface";

export interface RegisterUserInput {
    email: string;
<<<<<<< HEAD
    name: string;
=======
    username: string;
>>>>>>> 3dd66d0530c4868e3aad4d0c1c27fd4eda5e7d53
    password: string;
    role: Role;
}

export interface LoginUserInput {
    email: string;
    password: string;
}

