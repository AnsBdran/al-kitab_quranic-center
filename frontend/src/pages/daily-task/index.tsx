import {
  Box,
  Container,
  SegmentedControl,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { fontOptions } from '../../utils/_data';
import { Ayah } from '../../components';
import { useVerseSound } from '../../hooks';
import classes from './daily-task.module.css';

const DailyTask = () => {
  const [font, setFont] = useState<Font>('uthmanic_hafs');

  const { data } = useQuery({
    queryKey: ['verses'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'daily-task'),
  });

  const { playAudio, playingAyahId, reset } = useVerseSound(data);

  return (
    <Box>
      <Container>
        <Title>المطلوب اليومي</Title>{' '}
        {/* <SegmentedControl
          data={fontOptions}
          onChange={(value: Font) => setFont(value)}
          value={font}
          mx='auto'
          my='lg'
          display='flex'
        /> */}
        <Stack className={`${font}`} gap={12}>
          {data?.data.verses.map((verse: Verse) => (
            <Ayah
              verse={verse}
              key={verse.id.toString()}
              playAudio={playAudio}
              playingAyahId={playingAyahId}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default DailyTask;
