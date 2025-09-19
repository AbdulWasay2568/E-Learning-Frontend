import { prisma } from '../../prisma/client';
import { CreateGroupDto, UpdateGroupDto } from '../interfaces/group.interface';

export const createGroup = async (data: CreateGroupDto) => {
  return prisma.group.create({ data });
};

export const getGroupById = async (id: number) => {
  return prisma.group.findUnique({
    where: { id },
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            }
          }
        }
      },
      messages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            }
          }
        }
      },
    }
  });
};

export const getAllGroups = async () => {
  return prisma.group.findMany({
    include: {
      members: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            }
          }
        }
      },
      messages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileImage: true,
            }
          }
        }
      },
    }
  });
};

export const updateGroup = async (id: number, data: UpdateGroupDto) => {
  return prisma.group.update({ where: { id }, data });
};

export const deleteGroup = async (id: number) => {
  return prisma.group.delete({ where: { id } });
}; 