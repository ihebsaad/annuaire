import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
    {
        title: 'Repertoires',
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
