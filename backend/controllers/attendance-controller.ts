import { Request, Response } from 'express';
import { prisma } from '../lib';
import { AttendanceSubmittedData } from '../types';
import dayjs from 'dayjs';
import 'dayjs/locale/ar';
import { formatDays, generateDateRange } from '../utils/helpers';

const handleError = (error: any) => {
  if (error.message.includes('Unique constraint failed')) {
    return {
      ...error,
      message: 'عذراً، لقد تم إرسال البيانات لهذا اليوم من قبل.',
    };
  }
  return error;
};

export const attendance_index_get = async (req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany();
    res.status(200).json({ attendances });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const attendance_formatted_get = async (req: Request, res: Response) => {
  try {
    const attendances = await prisma.attendance.findMany({
      include: { student: { select: { first_name: true, last_name: true } } },
      orderBy: { attendance_date: 'desc' },
    });
    const transformedData: any = {};
    for (const record of attendances) {
      const { attendance_date, status, student_id } = record;
      if (!transformedData[attendance_date.toISOString()]) {
        transformedData[attendance_date.toISOString()] = {};
      }
      transformedData[attendance_date.toISOString()][
        `${record.student.first_name} ${record.student.last_name}`
      ] = record.status;
    }
    console.log({ transformedData });

    const resultData = Object.keys(transformedData).map((date, index) => ({
      id: index,
      attendance_date: date,
      ...transformedData[date],
    }));

    res.status(200).json({ attendances: resultData });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// =======================================================================================
// export const attendance_formatted_get = async (req: Request, res: Response) => {
//   try {
//     const attendances = await prisma.student.findMany({
//       select: {
//         id: true,
//         first_name: true,
//         last_name: true,
//         attendances: {
//           select: {
//             id: true,
//             attendance_date: true,
//             status: true,
//           },
//           orderBy: { attendance_date: 'desc' },
//         },
//       },
//     });

//     const formattedData = attendances.map((att) => {
//       const studentData: any = {
//         id: att.id,
//         name: `${att.first_name} ${att.last_name}`,
//       };
//       att.attendances.forEach((attDay) => {
//         studentData[attDay.attendance_date.toISOString()] = attDay.status;
//       });
//       return studentData;
//     });

//     res.status(200).json({ attendances: formattedData });
//   } catch (error: any) {
//     res.status(400).json({ error: error.message });
//   }
// };

// =======================================================================================
export const attendance_index_post = async (req: Request, res: Response) => {
  try {
    const values = req.body;
    const attendance = await prisma.attendance.createMany({ data: values });
    console.log({ values, attendance });
    res.status(201).json({ attendance });
  } catch (error: any) {
    console.log(error);
    const _ = handleError(error);
    res.status(400).json({ error: _.message });
  }
};

// export const attendance_singleDate_post = async (
//   req: Request,
//   res: Response
// ) => {
//   console.log('we rarararara');
//   try {
//     const attendance_date: string = req.body.attendance_date;
//     const attendances = req.body.attendances.map(
//       (att: AttendanceSubmittedData) => ({
//         attendance_date,
//         status: att.status,
//         student_id: att.student_id,
//       })
//     );
//     const data = await prisma.attendance.createMany({ data: attendances });
//     console.log('prisma said to you', data);
//     res.status(201).json({ data });
//   } catch (error: any) {
//     console.log('could NOT post the attendances', error);
//     res.status(400).json({ error: error.message });
//   }
// };

// =======================================================================================
export const attendance_oldDays_get = async (req: Request, res: Response) => {
  try {
    // console.log('get_old_days_ran');
    const oldDays = await prisma.attendance.findMany({
      distinct: 'attendance_date',
      select: {
        attendance_date: true,
      },
      orderBy: {
        attendance_date: 'desc',
      },
    });
    const dateRange = generateDateRange(oldDays);

    // console.log(dateRange, 'range');
    const formattedDays = formatDays(dateRange, oldDays);

    res
      .status(200)
      .json({ oldDays: formattedDays.reverse(), dateRange, _: oldDays });
  } catch (error: any) {
    console.log('error', error);
    res.status(400).json({ error: error.message });
  }
};
