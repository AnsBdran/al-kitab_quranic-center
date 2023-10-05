import { Box, Title, Text, Container, Skeleton } from '@mantine/core';
import { useTaskVerses, useWordSound } from '../../hooks';
import classes from './wbw.module.css';

const WBW = () => {
  const { data, pageNumbers, isLoading, isError } = useTaskVerses();
  const verses = data?.verses;
  const { playWord, activeWord } = useWordSound(verses);

  return (
    <Container>
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
      <Title>الورد اليومي</Title>
      {!isLoading ? (
        isError ? (
          <p>لا يوجد مطلوب لهذا اليوم</p>
        ) : (
          <Box className={classes.quran}>
            {verses?.map((verse: VerseFull) => (
              <Text key={verse.id} className={classes.verse}>
                {verse.words.map((word) => (
                  <Text
                    span
                    key={word.id}
                    className={`
                ${classes.word} ${activeWord === word.id ? 'active' : ''}
                `}
                    style={{ fontFamily: `'Mushaf Page ${word.page_number}'` }}
                    onClick={() => {
                      playWord(word.id);
                    }}
                  >
                    {word.code_v1}
                  </Text>
                ))}
              </Text>
            ))}
          </Box>
        )
      ) : (
        <>
          <Skeleton height={150} radius='md' />
        </>
      )}
    </Container>
  );
};

export default WBW;
