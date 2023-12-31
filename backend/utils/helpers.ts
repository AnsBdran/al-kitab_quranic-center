import dayjs from 'dayjs';

// export const generateDateRange = (
//   oldDays: { attendance_date: Date }[]
// ): string[] => {
//   if (!oldDays.length)
//     return [new Date(new Date().setHours(0, 0, 0, 0)).toISOString()];

//   // if (oldDays.length === 1)
//   //   return [new Date(oldDays[0].attendance_date).toISOString()];

//   const dates = [];
//   const startDate = oldDays[0].attendance_date;
//   // const startDate = oldDays[0].attendance_date;

//   // const endDate = new Date();
//   // const _ = new Date();
//   // _.setHours(0, 0, 0, 0);
//   const dateNow = new Date();
//   dateNow.setHours(0, 0, 0, 0);
//   // const dateNow = new Date(_);

//   while (dateNow.getUTCMilliseconds() <= startDate.getUTCMilliseconds()) {
//     console.log('did', dateNow);
//     dates.push(dateNow.toISOString());
//     dateNow.setDate(dateNow.getDate() - 1);
//   }

//   return dates;
// };

export const generateDateRange = (old: { attendance_date: Date }[]) => {
  if (!old.length) return [new Date().toISOString()];

  const dates = old.map((date) => date.attendance_date.getTime());
  const oldestDate = new Date(Math.min(...dates));
  const newestDate = new Date();

  const dateNow = new Date(oldestDate);
  const datesInRange = [];

  while (dateNow <= newestDate) {
    datesInRange.push(dateNow.toISOString());
    dateNow.setDate(dateNow.getDate() + 1);
  }

  return datesInRange;
};

export const formatDays = (
  daysRange: string[],
  oldDays: { attendance_date: Date }[]
) => {
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
  dayjs(day).locale('ar').format('dddd، DD - MM');
