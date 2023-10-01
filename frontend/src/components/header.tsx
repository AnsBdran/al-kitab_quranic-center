import {
  ActionIcon,
  Avatar,
  Burger,
  Container,
  Flex,
  Group,
  Menu,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { Icon } from '@iconify/react';
import { useAuthContext } from '../hooks';
import { useLogout } from '../hooks';
import { NavLink } from 'react-router-dom';

type HeaderProps = {
  opened: boolean;
  toggleSideNav: () => void;
};

const Header = ({ opened, toggleSideNav }: HeaderProps) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === 'dark';
  const { user } = useAuthContext();
  const { logout } = useLogout();

  return (
    <Container h='100%'>
      <Flex align='center' justify='space-between' h='100%'>
        <Group>
          <Text>
            <NavLink
              to='/'
              style={{
                textDecoration: 'none',
                color: 'var(--mantine-color-blue-5)',
                fontWeight: 500,
              }}
            >
              مركز الكتاب
            </NavLink>
          </Text>
        </Group>
        <Group>
          <ActionIcon
            onClick={toggleColorScheme}
            variant='outline'
            size='lg'
            style={{ border: 'none' }}
          >
            {dark ? <Icon icon='ph:sun-bold' /> : <Icon icon='bi:moon-fill' />}
          </ActionIcon>
          {user && (
            <Menu>
              <Menu.Target>
                <Avatar />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>{user?.name}</Menu.Label>
                <Menu.Item onClick={logout}>تسجيل الخروج</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
          <Burger opened={opened} onClick={toggleSideNav} hiddenFrom='sm' />
        </Group>
      </Flex>
    </Container>
  );
};

export default Header;
