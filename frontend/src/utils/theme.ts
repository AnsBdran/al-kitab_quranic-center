import { Alert, Button, NavLink, Title, createTheme } from '@mantine/core';
// import '@mantine/core/styles.layer.css';
import '@mantine/core/styles.layer.css';
// import '@mantine/dates/styles.css';
// import '@mantine/notifications/styles.css';

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        color: 'violet',
        variant: 'filled',
      },
    }),
    Title: Title.extend({
      defaultProps: {
        c: 'indigo.6',
        my: 'lg',
      },
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
  },
  // primaryShade: 7,
  headings: {
    fontFamily: 'Noto Kufi Arabic, sans-serif',
  },
});
