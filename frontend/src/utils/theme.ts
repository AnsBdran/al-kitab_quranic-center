import {
  Alert,
  Button,
  Container,
  NavLink,
  Title,
  createTheme,
} from '@mantine/core';
// import '@mantine/core/styles.layer.css';
import '@mantine/core/styles.layer.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export const theme = createTheme({
  colors: {
    brand: [
      '#f2f0ff',
      '#e0dff2',
      '#bfbdde',
      '#9b98ca',
      '#7d79ba',
      '#6a65b0',
      '#605bac',
      '#504c97',
      '#464388',
      '#3b3979',
    ],
  },
  primaryColor: 'indigo',
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: 'filled',
      },
    }),
    Title: Title.extend({
      defaultProps: {
        mb: 'lg',
      },
      styles: {},
    }),
    Alert: Alert.extend({
      styles: {
        root: {
          // width: 'max-content',
          paddingInline: '1rem',
        },
      },
      defaultProps: {},
    }),
    NavLink: NavLink.extend({
      defaultProps: {},
      styles: {},
    }),
    Container: Container.extend({
      styles: {
        root: {
          padding: 0,
        },
      },
    }),
  },

  // primaryShade: 7,
  headings: {
    fontFamily: 'Noto Kufi Arabic, sans-serif',
  },
});
