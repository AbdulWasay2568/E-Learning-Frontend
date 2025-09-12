import { apiClient } from './axios';
import type { RegisterUserInput, LoginUserInput } from "../interfaces/auth.interface";


export const registerUser = async (userData: RegisterUserInput) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (credentials: LoginUserInput) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};