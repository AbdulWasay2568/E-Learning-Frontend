import { prisma } from '../../prisma/client';
import { CreateQuizDto, UpdateQuizDto } from '../interfaces/quiz.interface';

export const createQuiz = async (data: CreateQuizDto) => {
  return prisma.quiz.create({ data });
};

export const getQuizById = async (id: number) => {
  return prisma.quiz.findUnique({
    where: { id },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      questions: true,
    }
  });
};

export const getAllQuizzes = async () => {
  return prisma.quiz.findMany({
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      questions: true,
    }
  });
};

export const updateQuiz = async (id: number, data: UpdateQuizDto) => {
  return prisma.quiz.update({ where: { id }, data });
};

export const deleteQuiz = async (id: number) => {
  return prisma.quiz.delete({ where: { id } });
};

export const getQuizzesByCourse = async (courseId: number) => {
  return prisma.quiz.findMany({
    where: { courseId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      questions: true,
    }
  });
};

export const getQuizzesByUser = async (userId: number) => {
  return prisma.quiz.findMany({
    where: { userId },
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
      createdBy: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      questions: true,
    }
  });
}; 