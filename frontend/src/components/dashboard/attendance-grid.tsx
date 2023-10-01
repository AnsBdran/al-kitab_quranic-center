import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Center,
  SegmentedControl,
  Flex,
  GridCol,
  Grid,
  Title,
} from '@mantine/core';
import axios from 'axios';
import { Fragment } from 'react';
import 'dayjs/locale/ar';
import { useQuery } from '@tanstack/react-query';
import { AttendanceFormFields, Student } from '../types';
import { UseFormReturnType } from '@mantine/form';

type AttendanceGridProps = {
  form: UseFormReturnType<
    AttendanceFormFields,
    (values: AttendanceFormFields) => AttendanceFormFields
  >;
};

const AttendanceGrid = ({ form, students }: AttendanceGridProps) => {
  const studentsStatusOptions = students?.data.students.map(
    (student: Student, index: number) => (
      <Fragment key={student.id}>
        <GridCol span={4}>{student.name}</GridCol>
        <GridCol span={6}>
          <SegmentedControl
            {...form.getInputProps(`attendances.${index}.status`)}
            data={[
              {
                value: 'PRESENT',
                label: (
                  <Center component={Flex} gap={8} c='green'>
                    حاضر
                    <Icon icon='ph:mask-happy-bold' />
                  </Center>
                ),
              },
              {
                value: 'LATE',
                label: (
                  <Center component={Flex} gap={8} c='gray.8'>
                    متأخر
                    <Icon icon='ph:mask-sad-bold' />
                  </Center>
                ),
              },
              {
                value: 'ABSENCE',
                label: (
                  <Center component={Flex} gap={8} c='red'>
                    غائب
                    <Icon icon='ph:mask-sad-fill' />
                  </Center>
                ),
              },
            ]}
          />
        </GridCol>
      </Fragment>
    )
  );

  return (
    <Grid align='center' my='lg'>
      <Grid.Col span={4}>
        <Title size={20}>اسم الطالب</Title>
      </Grid.Col>
      <Grid.Col span={6} />
      {studentsStatusOptions}
    </Grid>
  );
};

export default AttendanceGrid;
