import { Box, Container, Skeleton, Stack, Title, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Ayah } from '../../components';
import { useVerseSound } from '../../hooks';

const DailyTask = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['verses'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'daily-task'),
  });
  const verses = data?.data.verses;

  const { playAudio, playingAyahId } = useVerseSound(verses);

  return (
    <Box>
      <Container>
        <Title>المطلوب اليومي</Title>
        {isLoading ? (
          <Skeleton height={220} />
        ) : verses?.length ? (
          <Stack gap={12}>
            {verses.map((verse: Verse) => (
              <Ayah
                verse={verse}
                key={verse.id.toString()}
                playAudio={playAudio}
                playingAyahId={playingAyahId}
              />
            ))}
          </Stack>
        ) : (
          <Text>لا يوجد أي بيانات لعرضها</Text>
        )}
      </Container>
    </Box>
  );
};

export default DailyTask;
