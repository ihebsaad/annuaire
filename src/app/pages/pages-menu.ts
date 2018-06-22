import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
    {
        title: 'Directories',
        icon : 'ion-folder',
        link: '/pages/directories',
    },
    {
        title: 'Blog',
        icon: 'ion-document',
        link: '/pages/blog',
    },
    {
        title: 'Contact',
        icon: 'ion-arrow-swap',
        link: '/pages/contact',
    },
];
