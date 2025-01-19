import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'solar:widget-add-line-duotone',
    route: '/dashboard',
  },
  {
    navCap: 'Document Management',
    divider: true
  },
  {
    displayName: 'My Cases',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/document-managemnt/document-upload',
  },
  {
    displayName: 'Document Access',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/document-managemnt/document-access',
  },
  {
    navCap: 'User Management',
    divider: true
  },
  {
    displayName: 'Users',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/user-managemnt/users',
  },
  {
    navCap: 'Records',
    divider: true
  },
  {
    displayName: 'Activity',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/records/activity',
  },
  {
    displayName: 'Login',
    iconName: 'solar:login-3-line-duotone',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'solar:user-plus-rounded-line-duotone',
    route: '/authentication/register',
  },
];
