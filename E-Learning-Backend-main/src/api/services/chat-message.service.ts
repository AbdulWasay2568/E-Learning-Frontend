import { prisma } from '../../prisma/client';
import { CreateChatMessageDto, UpdateChatMessageDto } from '../interfaces/chat-message.interface';

export const createChatMessage = async (data: CreateChatMessageDto) => {
  return prisma.chatMessage.create({ data });
};

export const getChatMessageById = async (id: number) => {
  return prisma.chatMessage.findUnique({
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

export const getAllChatMessages = async () => {
  return prisma.chatMessage.findMany({
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

export const updateChatMessage = async (id: number, data: UpdateChatMessageDto) => {
  return prisma.chatMessage.update({ where: { id }, data });
};

export const deleteChatMessage = async (id: number) => {
  return prisma.chatMessage.delete({ where: { id } });
};

export const getChatMessagesByGroup = async (groupId: number) => {
  return prisma.chatMessage.findMany({
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
    },
    orderBy: {
      createdAt: 'asc'
    }
  });
};

export const getChatMessagesByUser = async (userId: number) => {
  return prisma.chatMessage.findMany({
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
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}; 