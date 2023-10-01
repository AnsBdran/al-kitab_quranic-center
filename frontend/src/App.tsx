import { RouterProvider } from 'react-router-dom';
import router from './utils/router';
import { DirectionProvider, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from './utils/theme';

function App() {
  return (
    <>
      <DirectionProvider detectDirection={true}>
        <MantineProvider defaultColorScheme='dark' theme={theme}>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </DirectionProvider>
    </>
  );
}

export default App;
