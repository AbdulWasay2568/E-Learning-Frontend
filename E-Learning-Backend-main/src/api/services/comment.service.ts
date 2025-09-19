import { prisma } from '../../prisma/client';
import { CreateCommentDto, UpdateCommentDto } from '../interfaces/comment.interface';

export const createComment = async (data: CreateCommentDto) => {
  return prisma.comment.create({ data });
};

export const getCommentById = async (id: number) => {
  return prisma.comment.findUnique({
    where: { id },
    include: {
      lecture: {
        select: {
          id: true,
          title: true,
          videoUrl: true,
          duration: true,
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
      parent: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
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
      replies: {
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

export const getAllComments = async () => {
  return prisma.comment.findMany({
    where: { parentId: null }, // Only get top-level comments
    include: {
      lecture: {
        select: {
          id: true,
          title: true,
          videoUrl: true,
          duration: true,
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
      replies: {
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

export const updateComment = async (id: number, data: UpdateCommentDto) => {
  return prisma.comment.update({ where: { id }, data });
};

export const deleteComment = async (id: number) => {
  return prisma.comment.delete({ where: { id } });
};

export const getCommentsByLecture = async (lectureId: number) => {
  return prisma.comment.findMany({
    where: { lectureId, parentId: null }, // Only get top-level comments
    include: {
      lecture: {
        select: {
          id: true,
          title: true,
          videoUrl: true,
          duration: true,
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
      replies: {
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

export const getCommentsByUser = async (userId: number) => {
  return prisma.comment.findMany({
    where: { userId },
    include: {
      lecture: {
        select: {
          id: true,
          title: true,
          videoUrl: true,
          duration: true,
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
      parent: {
        select: {
          id: true,
          comment: true,
          createdAt: true,
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
      replies: {
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

export const getCommentReplies = async (parentId: number) => {
  return prisma.comment.findMany({
    where: { parentId },
    include: {
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