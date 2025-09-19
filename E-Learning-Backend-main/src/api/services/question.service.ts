import { prisma } from '../../prisma/client';
import { CreateQuestionDto, UpdateQuestionDto } from '../interfaces/question.interface';

export const createQuestion = async (data: CreateQuestionDto) => {
  return prisma.question.create({ data });
};

export const getQuestionById = async (id: number) => {
  return prisma.question.findUnique({
    where: { id },
    include: {
      quiz: {
        select: {
          id: true,
          title: true,
        }
      },
    }
  });
};

export const getAllQuestions = async () => {
  return prisma.question.findMany({
    include: {
      quiz: {
        select: {
          id: true,
          title: true,
        }
      },
    }
  });
};

export const updateQuestion = async (id: number, data: UpdateQuestionDto) => {
  return prisma.question.update({ where: { id }, data });
};

export const deleteQuestion = async (id: number) => {
  return prisma.question.delete({ where: { id } });
};

export const getQuestionsByQuiz = async (quizId: number) => {
  return prisma.question.findMany({
    where: { quizId },
    include: {
      quiz: {
        select: {
          id: true,
          title: true,
        }
      },
    }
  });
}; 