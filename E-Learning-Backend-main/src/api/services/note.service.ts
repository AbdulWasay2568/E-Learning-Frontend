import { prisma } from '../../prisma/client';
import { CreateNoteDto, UpdateNoteDto } from '../interfaces/note.interface';

export const createNote = async (data: CreateNoteDto) => {
  return prisma.note.create({ data });
};

export const getNoteById = async (id: number) => {
  return prisma.note.findUnique({
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
    }
  });
};

export const getAllNotes = async () => {
  return prisma.note.findMany({
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
    }
  });
};

export const updateNote = async (id: number, data: UpdateNoteDto) => {
  return prisma.note.update({ where: { id }, data });
};

export const deleteNote = async (id: number) => {
  return prisma.note.delete({ where: { id } });
};

export const getNotesByUser = async (userId: number) => {
  return prisma.note.findMany({
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
    }
  });
};

export const getNotesByLecture = async (lectureId: number) => {
  return prisma.note.findMany({
    where: { lectureId },
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
    }
  });
}; 