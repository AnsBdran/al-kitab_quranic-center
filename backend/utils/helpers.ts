import dayjs from 'dayjs';

export const generateDateRange = (
  oldDays: { attendance_date: Date }[]
): string[] => {
  if (!oldDays.length)
    return [new Date(new Date().setHours(0, 0, 0, 0)).toISOString()];

  if (oldDays.length === 1)
    return [new Date(oldDays[0].attendance_date).toISOString()];

  const dates = [];
  const endDate = oldDays[oldDays.length - 1].attendance_date;
  const startDate = oldDays[0].attendance_date;

  const _ = new Date(endDate);
  _.setHours(0, 0, 0, 0);
  const dateNow = new Date(_);

  while (dateNow >= startDate) {
    // console.log('did', dateNow);
    dates.push(dateNow.toISOString());
    dateNow.setDate(dateNow.getDate() - 1);
  }

  return dates;
};

export const formatDays = (
  daysRange: string[],
  oldDays: { attendance_date: Date }[]
) => {
  // const today = {
  //   value: day,
  //   title: dayjs(day).locale('ar').format('dddd، DD | MMMM'),
  //   missing: true,
  // };

  // if (daysRange.length === 1)
  //   return [
  //     {
  //       value: daysRange[0],
  //       title: formatDay(daysRange[0]),
  //       missing: true,
  //     },
  //   ];

  return daysRange.map((day) => {
    if (
      !oldDays.some(
        (dayObject) =>
          dayObject.attendance_date.getTime() === new Date(day).getTime()
      )
    ) {
      return {
        value: day,
        title: formatDay(day),
        missing: true,
      };
    }

    return {
      value: day,
      title: formatDay(day),
    };
  });
};

const formatDay = (day: string) =>
  dayjs(day).locale('ar').format('dddd، DD | MMMM');
