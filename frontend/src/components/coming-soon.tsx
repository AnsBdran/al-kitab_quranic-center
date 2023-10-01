import { Box, Title, Image } from '@mantine/core';

const ComingSoon = () => {
  return (
    <Box>
      <Title style={{ textAlign: 'center' }}>قادم قريباً</Title>
      <Image
        src='/soon.jpg'
        mah={{
          base: 300,
          md: 450,
          lg: 500,
        }}
        radius='md'
      />
    </Box>
  );
};

export default ComingSoon;
