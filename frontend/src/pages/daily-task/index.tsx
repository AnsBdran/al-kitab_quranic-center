import {
  Box,
  Container,
  Skeleton,
  Title,
  Text,
  Divider,
  Table,
} from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useTaskVerses, useVerseSound } from '../../hooks';
import classes from './daily-task.module.css';
import surahs from '../../utils/surahs.json';
import { Icon } from '@iconify/react/dist/iconify.js';

const DailyTask = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['verses'],
    queryFn: () => axios.get(import.meta.env.VITE_SERVER_URL + 'daily-task'),
  });
  const verses = data?.data.verses;

  const { playAudio, playingAyahId } = useVerseSound(verses);
  const surah = verses && surahs[parseInt(verses[0].key.split(':')[0])];
  const { pageNumbers } = useTaskVerses();

  return (
    <>
      {pageNumbers?.map((page) => (
        <style key={page}>
          {`
    @font-face {
      font-family: 'Mushaf Page ${page}';
      src: local('./fonts/mushaf-woff2/QCF_P${page}.woff2'),
      url(https://cdn.rawgit.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff2/QCF_P${page}.woff2) format('woff2'),
      url(https://cdn.rawgit.com/mustafa0x/qpc-fonts/f93bf5f3/mushaf-woff/QCF_P${page}.woff) format('woff');
    }
    `}
        </style>
      ))}
      <Box>
        <Container>
          <Title>المطلوب اليومي</Title>
          {isLoading ? (
            <Skeleton height={220} />
          ) : verses?.length ? (
            <Box className={classes.surahBox}>
              <Title order={2} className={classes.surahName}>
                سورة {surah.name}
              </Title>
              <Divider />
              <Table highlightOnHover>
                <Table.Tbody>
                  {verses.map((verse: Verse) => (
                    <Table.Tr
                      key={verse.id}
                      className={
                        playingAyahId === verse.id ? classes.activeVerse : ''
                      }
                      onClick={() => playAudio(verse.id)}
                    >
                      <Table.Td className={classes.verseNumber}>
                        {verse.number}
                      </Table.Td>
                      <Table.Td
                        className={classes.verseText}
                        style={{
                          fontFamily: `'Mushaf Page ${verse.page_number}'`,
                        }}
                      >
                        {verse.text}
                      </Table.Td>
                      <Table.Td align='left' w='' className={classes.audioIcon}>
                        <Icon
                          icon={
                            playingAyahId === verse.id
                              ? 'svg-spinners:bars-scale-middle'
                              : 'material-symbols:sound-detection-loud-sound-rounded'
                          }
                        />
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
              {/* <Box>
              {verses.map((verse: Verse) => (
                <>
                <Ayah
                verse={verse}
                key={verse.id.toString()}
                playAudio={playAudio}
                playingAyahId={playingAyahId}
                classes={classes}
                />
                <Divider />
                </>
              ))}
            </Box> */}
            </Box>
          ) : (
            <Text>لا يوجد أي بيانات لعرضها</Text>
          )}
        </Container>
      </Box>
    </>
  );
};

export default DailyTask;
