import { prisma } from '../../prisma/client';
import { CreateGroupMemberDto, UpdateGroupMemberDto } from '../interfaces/group-member.interface';

export const createGroupMember = async (data: CreateGroupMemberDto) => {
  return prisma.groupMember.create({ data });
};

export const getGroupMemberById = async (id: number) => {
  return prisma.groupMember.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      group: {
        select: {
          id: true,
          name: true,
        }
      },
    }
  });
};

export const getAllGroupMembers = async () => {
  return prisma.groupMember.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      group: {
        select: {
          id: true,
          name: true,
        }
      },
    }
  });
};

export const updateGroupMember = async (id: number, data: UpdateGroupMemberDto) => {
  return prisma.groupMember.update({ where: { id }, data });
};

export const deleteGroupMember = async (id: number) => {
  return prisma.groupMember.delete({ where: { id } });
};

export const getGroupMembersByGroup = async (groupId: number) => {
  return prisma.groupMember.findMany({
    where: { groupId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      group: {
        select: {
          id: true,
          name: true,
        }
      },
    }
  });
};

export const getGroupMembersByUser = async (userId: number) => {
  return prisma.groupMember.findMany({
    where: { userId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      group: {
        select: {
          id: true,
          name: true,
        }
      },
    }
  });
};

export const checkGroupMembership = async (userId: number, groupId: number) => {
  return prisma.groupMember.findFirst({
    where: { userId, groupId }
  });
}; 