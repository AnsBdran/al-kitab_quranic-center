import { Icon } from '@iconify/react/dist/iconify.js';
import { Box, Image, Title, Text, Flex, Container } from '@mantine/core';
import classes from './home.module.css';

const steps = [
  { icon: 'ic:outline-hearing', color: 'cyan', value: 'أستمع' },
  { icon: 'material-symbols:barcode-reader', color: 'blue', value: 'أُردِّد' },
  {
    icon: 'ion:happy-sharp',
    color: 'gray',
    value: 'أتلُ بإتقان',
  },
  { icon: 'ph:smiley-wink-fill', color: 'red.9', value: 'أحفظ بجودة' },
  {
    icon: 'fluent:checkmark-starburst-20-filled',
    color: 'green',
    value: 'أسرد على جلسة واحدة.',
  },
];
const LastStepIndex = steps.length - 1;

const Homepage = () => {
  console.log('classes', classes);
  return (
    <Container>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align='center'
        justify='space-between'
      >
        <Box className={classes.contentWrapper}>
          <Title className={classes.title} fz={{ base: '48px', lg: '56px' }}>
            القارئ الصغير
          </Title>
          <Flex className={classes.stepsWrapper}>
            {steps.map((step, index) => (
              <Flex
                bg={step.color}
                key={step.value}
                className={
                  index === LastStepIndex ? classes.lastStep : classes.step
                }
                // component={Flex}
              >
                <Icon icon={step.icon} fontSize='1.4rem' />
                <Text fw={400 + index * 100}>{step.value}</Text>
                {index < steps.length - 1 && (
                  <Icon icon='material-symbols:line-start-arrow-notch-rounded' />
                )}
              </Flex>
            ))}
          </Flex>
        </Box>
        <Box className={classes.imgWrapper}>
          <Image src='/hero.jpg' className={classes.img} />
        </Box>
      </Flex>
    </Container>
  );
};

export default Homepage;
