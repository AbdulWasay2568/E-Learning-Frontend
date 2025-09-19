import { Request, Response } from 'express';
import * as enrollmentService from '../services/enrollment.service';

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await enrollmentService.createEnrollment(req.body);
    res.status(201).json({ enrollment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  try {
    const enrollmentId = Number(req.params.id);
    const enrollment = await enrollmentService.getEnrollmentById(enrollmentId);
    if (!enrollment) return res.status(404).json({ message: 'Enrollment not found' });
    res.json({ enrollment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllEnrollments = async (_req: Request, res: Response) => {
  try {
    const enrollments = await enrollmentService.getAllEnrollments();
    res.json({ enrollments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const updateEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollmentId = Number(req.params.id);
    const enrollment = await enrollmentService.updateEnrollment(enrollmentId, req.body);
    res.json({ enrollment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  try {
    await enrollmentService.deleteEnrollment(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEnrollmentsByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const enrollments = await enrollmentService.getEnrollmentsByUser(userId);
    res.json({ enrollments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getEnrollmentsByCourse = async (req: Request, res: Response) => {
  try {
    const courseId = Number(req.params.courseId);
    const enrollments = await enrollmentService.getEnrollmentsByCourse(courseId);
    res.json({ enrollments });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const checkEnrollment = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const courseId = Number(req.params.courseId);
    const enrollment = await enrollmentService.checkEnrollment(userId, courseId);
    res.json({ isEnrolled: !!enrollment, enrollment });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
}; 