import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Box,
  Image,
  Title,
  Text,
  Flex,
  Container,
  Anchor,
} from '@mantine/core';
import classes from './home.module.css';
import { NavLink } from 'react-router-dom';

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
        justify='space-between'
        gap='4rem'
        mih='70vh'
        align='center'
      >
        <Box className={classes.contentWrapper}>
          <Title className={classes.title}>القارئ الصغير</Title>
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
                <Text className={classes.stepTitle}>{step.value}</Text>
                {index < steps.length - 1 && (
                  <Icon icon='material-symbols:line-start-arrow-notch-rounded' />
                )}
              </Flex>
            ))}
          </Flex>
          <Flex gap='lg' my='auto' mt='xl' justify='center'>
            {/* <ِAnchor component={NavLink}></ِAnchor> */}
            <Anchor component={NavLink} to='/wbw'>
              المطلوب اليومي
            </Anchor>
            <Anchor component={NavLink} to='/attendance'>
              جدول الحضور
            </Anchor>
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
