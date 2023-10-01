import { Outlet } from 'react-router-dom';
import { Header, SideNav } from '../components';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

const MainLayout = () => {
  const [openedSideNav, { toggle, close }] = useDisclosure(false);
  return (
    <AppShell
      withBorder
      header={{ height: { base: 48, sm: 60, lg: 64 } }}
      padding='lg'
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !openedSideNav, desktop: false },
        // position: 'top',
      }}
    >
      <AppShell.Header>
        <Header opened={openedSideNav} toggleSideNav={toggle} />
      </AppShell.Header>

      <AppShell.Navbar>
        <SideNav closeSideNav={close} />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default MainLayout;
