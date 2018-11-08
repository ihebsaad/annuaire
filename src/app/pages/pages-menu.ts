import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'ion-home',
    link: '/dashboard',
    home: true,
  }, {
        title: 'Entrées',
        icon : 'ion-folder',
        link: '/directories',
    }, {
        title: 'Catégories',
        icon : 'ion-filing',
        link: '/categories',
    }, {
        title: 'Articles',
        icon : 'ion-document',
        link: '/articles',
    }, {
        title: 'Annonces',
        icon : 'ion-clipboard',
        link: '/annonces',
    },/* {
        title: 'Blog',
        icon: 'ion-document-text',
        link: '/blog',
    },*/ {
        title: ' Utilisateurs',
        icon: 'fa fa-users',
        link: '/users',
    }
];
export const MENU_ITEMS_SIMPLE: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'ion-home',
    link: '/dashboard',
    home: true,
  }, {
        title: 'Entrées',
        icon : 'ion-folder',
        link: '/directories',
    },  {
        title: 'Articles',
        icon : 'ion-document',
        link: '/articles',
    }, {
        title: 'Annonces',
        icon : 'ion-clipboard',
        link: '/annonces',
    },/* {
        title: 'Blog',
        icon: 'ion-document-text',
        link: '/blog',
    }*/, {
        title: 'Contact',
        icon: 'ion-arrow-swap',
        link: '/contact',
    }
];
