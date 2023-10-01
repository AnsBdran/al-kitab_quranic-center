import { Request, Response } from 'express';
import { prisma } from '../lib';

export const bestStudent_index_post = async (req: Request, res: Response) => {
  try {
    const values = req.body;
    console.log(values);
    const bestStudent = await prisma.bestStudent.create({
      data: {
        from: values.dateRange[0],
        to: values.dateRange[1],
        student_id: parseInt(values.student),
      },
    });
    console.log({ bestStudent });
    res.status(201).json({ bestStudent });
  } catch (error: any) {
    console.log('error', error);
    res.status(401).json({ error: error.message });
  }
};

export const bestStudent_index_get = async (req: Request, res: Response) => {
  try {
    const _ = await prisma.bestStudent.findMany({
      select: {
        from: true,
        to: true,
        student: {
          select: {
            first_name: true,
            middle_name: true,
            last_name: true,
          },
        },
        isActive: true,
      },
    });
    const best_students = _.map((student) => ({
      ...student,
      student: `${student.student.first_name} ${student.student.middle_name} ${student.student.last_name}`,
    }));
    res.status(200).json(best_students);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
