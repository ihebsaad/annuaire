import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'ion-home',
    link: '/pages/dashboard',
    home: true,
  }, {
        title: 'Repertoires',
        icon : 'ion-folder',
        link: '/pages/directories',
    }, {
        title: 'Catégories',
        icon : 'ion-filing',
        link: '/pages/categories',
    }, {
        title: 'Articles',
        icon : 'ion-document',
        link: '/pages/articles',
    }, {
        title: 'Annonces',
        icon : 'ion-clipboard',
        link: '/pages/annonces',
    }, {
        title: 'Blog',
        icon: 'ion-document-text',
        link: '/pages/blog',
    }, {
        title: 'Utilisateurs',
        icon: 'ion-contacts',
        link: '/pages/users',
    }
];
export const MENU_ITEMS_SIMPLE: NbMenuItem[] = [
  {
    title: 'Accueil',
    icon: 'ion-home',
    link: '/pages/dashboard',
    home: true,
  }, {
        title: 'Repertoires',
        icon : 'ion-folder',
        link: '/pages/directories',
    },  {
        title: 'Articles',
        icon : 'ion-document',
        link: '/pages/articles',
    }, {
        title: 'Annonces',
        icon : 'ion-clipboard',
        link: '/pages/annonces',
    }, {
        title: 'Blog',
        icon: 'ion-document-text',
        link: '/pages/blog',
    }, {
        title: 'Contact',
        icon: 'ion-arrow-swap',
        link: '/pages/contact',
    }
];
