import { prisma } from '../../prisma/client';
import { CreateUserDto, UpdateUserDto } from '../interfaces/user.interface';

export const createUser = async (data: CreateUserDto) => {
  return prisma.user.create({ data });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique(
    { where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        profileImage: true,
        role: true,
      }
    }
  );
};

export const getAllUsers = async () => {
  return prisma.user.findMany();
};

export const updateUser = async (id: number, data: UpdateUserDto) => {
  return prisma.user.update({ where: { id }, data });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
}; 
