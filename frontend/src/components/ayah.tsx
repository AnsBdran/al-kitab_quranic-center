import { Icon } from '@iconify/react/dist/iconify.js';
import { Text, ActionIcon, Grid } from '@mantine/core';

type AyahProps = {
  verse: Verse;
  playAudio: (key: number) => void;
  playingAyahId: number | null;
};

const Ayah = ({
  verse: { number, text, id },
  playAudio,
  playingAyahId,
}: AyahProps) => {
  return (
    <Grid justify='center' gutter='sm'>
      <Grid.Col span={1} style={{ alignSelf: 'center' }}>
        <Text>{number.toLocaleString()}</Text>
      </Grid.Col>
      <Grid.Col span={8}>
        <Text span className='quran'>
          {text}{' '}
        </Text>
        {/* <Text span className='ayah_number'>
          {number}
        </Text> */}
      </Grid.Col>
      <Grid.Col span={1}>
        <ActionIcon variant='outline' onClick={() => playAudio(id)}>
          <Icon
            icon={
              playingAyahId === id
                ? 'svg-spinners:bars-scale-middle'
                : 'material-symbols:sound-detection-loud-sound-rounded'
            }
          />
        </ActionIcon>
      </Grid.Col>
    </Grid>
  );
};

export default Ayah;

// <Box>
//   <Text>
//     <Text span className='quran'>
//       {text}{' '}
//     </Text>
//     <Text span className='ayah_number'>
//       {number.toLocaleString()}
//     </Text>
//   </Text>
//   <ActionIcon variant='outline' onClick={() => playAudio(id)}>
//     <Icon icon='material-symbols:sound-detection-loud-sound-rounded' />
//   </ActionIcon>
// </Box>
