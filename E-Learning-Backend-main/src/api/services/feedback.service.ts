import { prisma } from '../../prisma/client';
import { CreateFeedbackDto, UpdateFeedbackDto } from '../interfaces/feedback.interface';

export const createFeedback = async (data: CreateFeedbackDto) => {
  return prisma.feedback.create({ data });
};

export const getFeedbackById = async (id: number) => {
  return prisma.feedback.findUnique({
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
    }
  });
};

export const getAllFeedbacks = async () => {
  return prisma.feedback.findMany({
    include: {
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
    }
  });
};

export const updateFeedback = async (id: number, data: UpdateFeedbackDto) => {
  return prisma.feedback.update({ where: { id }, data });
};

export const deleteFeedback = async (id: number) => {
  return prisma.feedback.delete({ where: { id } });
};

export const getFeedbacksByCourse = async (courseId: number) => {
  return prisma.feedback.findMany({
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
    }
  });
};

export const getFeedbacksByUser = async (userId: number) => {
  return prisma.feedback.findMany({
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
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
    }
  });
};

export const getAverageRatingByCourse = async (courseId: number) => {
  const result = await prisma.feedback.aggregate({
    where: { courseId },
    _avg: {
      rating: true
    },
    _count: {
      rating: true
    }
  });
  
  return {
    averageRating: result._avg.rating || 0,
    totalFeedbacks: result._count.rating
  };
}; 