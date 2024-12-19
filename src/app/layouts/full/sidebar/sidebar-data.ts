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
    displayName: 'UserGroups',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/user-managemnt/user-groups',
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
    navCap: 'Ui Components',
    divider: true
  },
  {
    displayName: 'Badge',
    iconName: 'solar:archive-minimalistic-line-duotone',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'solar:danger-circle-line-duotone',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'solar:bookmark-square-minimalistic-line-duotone',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'solar:text-field-focus-line-duotone',
    route: '/ui-components/tooltips',
  },
  {
    displayName: 'Forms',
    iconName: 'solar:file-text-line-duotone',
    route: '/ui-components/forms',
  },
  {
    displayName: 'Tables',
    iconName: 'solar:tablet-line-duotone',
    route: '/ui-components/tables',
  },
  {
    navCap: 'Auth',
    divider: true
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
  {
    navCap: 'Extra',
    divider: true
  },
  {
    displayName: 'Icons',
    iconName: 'solar:sticker-smile-circle-2-line-duotone',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'solar:planet-3-line-duotone',
    route: '/extra/sample-page',
  },
];
