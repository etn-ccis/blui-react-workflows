import { RouteConfig } from '@brightlayer-ui/react-auth-workflow';

export const routes: RouteConfig = {
    LOGIN: '/login',
    REGISTER_INVITE: '/register-by-invite?code=DEBUG_VALIDATION_CODE_DEADBEEF&email=example@example.com',
    REGISTER_SELF: '/self-registration',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
    SUPPORT: '/contact-support',
};
