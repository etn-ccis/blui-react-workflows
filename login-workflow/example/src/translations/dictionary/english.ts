import { AppTranslationsFile } from './types';

const resources: AppTranslationsFile = {
    translation: {
        DRAWER_MENU: {
            TITLE: 'Title',
            DASHBOARD: 'Dashboard',
            LOCATIONS: 'Locations',
        },
        TOOLBAR_MENU: {
            HOME_PAGE: 'Home Page',
        },
        PAGE_DETAILS: {
            AUTHORISED_MESSAGE: 'Authorised Message',
        },
        USER_MENU: {
            LOG_OUT: 'Log out',
            CHANGE_PASSWORD: 'Change Password',
            MY_ACCOUNT: 'My Account',
        },
        ERROR_MESSAGE: {
            EMAIL_ERROR_MESSAGE: '{{email}} is already registered',
            EMAIL_ERROR_TITLE: 'Error {{timestamp}}',
        },
    },
};
export default resources;
