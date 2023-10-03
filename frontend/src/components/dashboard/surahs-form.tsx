import { Box, Button, Text, RangeSlider, Title } from '@mantine/core';
import SurahSelect from '../surah-select';
import { useState } from 'react';
import { useForm } from '@mantine/form';
import surahs from '../../utils/surahs.json';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const surahsOptions = surahs.map((surah) => ({
  value: surah.id,
  label: surah.name,
  verses: surah.verses_count,
}));

const SurahsForm = () => {
  const [max, setMax] = useState(1);

  const handleSurahChange = (value: string) => {
    const surah = JSON.parse(value);
    form.setFieldValue('surah', value);
    form.setFieldValue('range', [1, surah.verses]);
    setMax(surah.verses);
  };

  const form = useForm<SurahFormData>({
    initialValues: {
      surah: '',
      range: [0, 100],
    },
  });

  const { mutate, isLoading } = useMutation({
    mutationFn: (values: {
      surah_id: number;
      verses: number;
      range: [number, number];
    }) => axios.post(import.meta.env.VITE_SERVER_URL + 'daily-task', values),
  });

  const handleFormSubmit = async (values: {
    surah: string;
    range: [number, number];
  }) => {
    if (!values.surah) return;
    const surah = JSON.parse(values.surah);
    mutate({
      surah_id: surah.value,
      verses: surah.verses,
      range: values.range,
    });
  };

  return (
    <Box>
      <Title order={2}>اختيار سورة جديدة</Title>
      <form onSubmit={form.onSubmit(handleFormSubmit)}>
        <SurahSelect
          selectSurah={handleSurahChange}
          surah={form.values.surah}
          // {...form.getInputProps('surah')}
          surahs={surahsOptions}
        />
        {form.values.surah && (
          <Box mt='3rem'>
            <RangeSlider
              max={max}
              min={1}
              {...form.getInputProps('range')}
              minRange={1}
            />
            <Text>الآيات المطلوبة</Text>
          </Box>
        )}
        <Button type='submit' mt='md' loading={isLoading}>
          تسجيل المطلوب
        </Button>
      </form>
    </Box>
  );
};

export default SurahsForm;
