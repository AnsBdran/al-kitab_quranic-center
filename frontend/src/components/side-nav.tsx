import { Icon } from '@iconify/react/dist/iconify.js';
import {
  NavLink as MantLink,
  NavLinkProps as MantLinkProps,
  Box,
} from '@mantine/core';
import {
  NavLink as RouteLink,
  NavLinkProps as RouteLinkProps,
  useLocation,
} from 'react-router-dom';

type SideNavProps = {
  closeSideNav: () => void;
};
type NavLinkProps = MantLinkProps & RouteLinkProps;

const navLinks: NavLink[] = [
  {
    to: '/daily-task',
    label: 'المطلوب اليومي',
    icon: 'bi:list-task',
  },
  {
    to: '/wbw',
    label: 'المطلوب اليومي - كلمة بكلمة',
    icon: 'ph:chart-pie-slice-light',
  },
  {
    to: '/attendance',
    label: 'جدول الحضور',
    icon: 'material-symbols:co-present-outline',
  },
  {
    to: '/surahs-progress',
    label: 'جدول حفظ السور',
    icon: 'material-symbols:data-table-outline',
  },
  {
    to: '/top',
    label: 'أفضل الطلاب',
    icon: 'fa6-solid:medal',
  },
  {
    to: '/dashboard',
    label: 'لوحة التحكم',
    icon: 'ant-design:control-outlined',
  },
];

const SideNav = ({ closeSideNav }: SideNavProps) => {
  const NavLink = (props: NavLinkProps) => (
    <MantLink {...props} fz='xl' component={RouteLink} onClick={closeSideNav} />
  );

  const location = useLocation();

  return (
    <>
      <Box className='nav'>
        {navLinks.map((navLink) => (
          <NavLink
            to={navLink.to}
            label={navLink.label}
            leftSection={<Icon icon={navLink.icon} />}
            active={location.pathname === navLink.to}
            key={navLink.to}
          />
        ))}
      </Box>
    </>
  );
};

export default SideNav;
