import { prisma } from '../../prisma/client';
import { CreateEnrollmentDto, UpdateEnrollmentDto } from '../interfaces/enrollment.interface';

export const createEnrollment = async (data: CreateEnrollmentDto) => {
  return prisma.enrollment.create({ data });
};

export const getEnrollmentById = async (id: number) => {
  return prisma.enrollment.findUnique({
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
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
    }
  });
};

export const getAllEnrollments = async () => {
  return prisma.enrollment.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
    }
  });
};

export const updateEnrollment = async (id: number, data: UpdateEnrollmentDto) => {
  return prisma.enrollment.update({ where: { id }, data });
};

export const deleteEnrollment = async (id: number) => {
  return prisma.enrollment.delete({ where: { id } });
};

export const getEnrollmentsByUser = async (userId: number) => {
  return prisma.enrollment.findMany({
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
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
    }
  });
};

export const getEnrollmentsByCourse = async (courseId: number) => {
  return prisma.enrollment.findMany({
    where: { courseId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          profileImage: true,
        }
      },
      course: {
        select: {
          id: true,
          title: true,
          description: true,
          thumbnail: true,
        }
      },
    }
  });
};

export const checkEnrollment = async (userId: number, courseId: number) => {
  return prisma.enrollment.findFirst({
    where: { userId, courseId }
  });
}; 