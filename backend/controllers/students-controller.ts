import { Request, Response } from 'express';
import { prisma } from '../lib';

export const students_index_post = async (req: Request, res: Response) => {
  const values = req.body;
  console.log('student values', values);
  try {
    const data = await prisma.student.create({ data: values });
    console.log('prisma said', data);
    res.status(201).json({
      student: {
        id: data.id,
        name: `${data.first_name} ${data.last_name}`,
      },
    });
  } catch (error: any) {
    console.log(error);
    res.status(400).json({ error: 'حدث خطاً أثناء محاولة إضافة طالب جديد.' });
  }
};

export const students_basic_get = async (req: Request, res: Response) => {
  try {
    const _students = await prisma.student.findMany();
    const students = _students.map(({ id, first_name, last_name }) => ({
      id,
      name: `${first_name} ${last_name}`,
    }));
    res.status(200).json({ students });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: 'no students were found' });
  }
};

export const students_full_get = async (req: Request, res: Response) => {
  try {
    const students = await prisma.student.findMany();
    res.status(200).json({ students });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
