import { AuthLanguageFile } from './types';

const resources: AuthLanguageFile = {
    translation: {
        FORGOT_PASSWORD: {
            ERROR: "Impossible de réinitialiser votre mot de passe pour l'instant",
            INSTRUCTIONS:
                "Entrez l'adresse e-mail du compte associée au compte.\n\n" +
                'Si ce courrier électronique a un compte chez Eaton, vous recevrez une réponse sous <b>un jour ouvrable</b>.\n\n' +
                'Pour les problèmes de compte urgents, veuillez appeler le {{phone}}.',
            INSTRUCTIONS_ALT:
                `Entrez l'adresse e-mail du compte associée au compte.<br/><br/>` +
                `Si ce courrier électronique a un compte chez Eaton, vous recevrez une réponse sous <1>un jour ouvrable</1>.<br/><br/>` +
                `Pour les problèmes de compte urgents, veuillez appeler le <4>{{phone}}</4>.`,
            RESET_CODE_ERROR: `Une erreur s'est produite avec votre code de réinitialisation. `,
            LINK_SENT: 'Un lien pour réinitialiser votre mot de passe a été envoyé à <b>{{email}}</b>.',
            LINK_SENT_ALT: 'Un lien pour réinitialiser votre mot de passe a été envoyé à <1>{{email}}</1>.',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: 'Email ou mot de passe incorrect',
            INVALID_CREDENTIALS: "Votre combinaison nom d'utilisateur / mot de passe n'est pas reconnue.",
            GENERIC_ERROR: "Votre demande n'a pas pu être traitée pour le moment.\n",
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'Votre mot de passe a été réinitialisé avec succès',
            FAILURE_MESSAGE: `Votre mot de passe n'a pas pu être réinitialisé. Veuillez réessayer plus tard.`,
        },
        USER_SETTINGS: {
            NAME: 'Nom',
            EMAIL: 'Email',
            PHONE_NUMBER: 'Numéro de téléphone',
            PASSWORD: 'Mot de passe',
            EMAIL_NOTIFICATION: 'Notification par e-mail',
            ENABLED: 'Activée',
            ORGANIZATION: 'Organisation',
            ORGANIZATION_NAME: "nom de l'organisation",
            ADDRESS: 'Adresse',
            CHANGE_PASSWORD: 'changer le mot de passe',
            ACCOUNT: 'Compte',
        },
        COUNTER: 'La valeur est: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Mot de passe oublié?',
        },
        ERROR_MESSAGES: {
            '2002': "Le lien d'enregistrement de l'utilisateur est déjà utilisé.",
            '9003': "L'opération demandée ne peut pas être effectuée, veuillez contacter votre administrateur",
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Mot de passe changé',
            PASSWORD: 'Changer le mot de passe',
            SUCCESS_MESSAGE:
                "Votre mot de passe a été mis à jour avec succès! Pour garantir la sécurité de votre compte, vous devrez vous connecter à l'application avec vos informations d'identification mises à jour.",
            EMAIL_CONFIRM_MESSAGE: 'Nous avons envoyé un e-mail de confirmation à <b>{{email}}</b>',
            PASSWORD_INFO: `Veuillez sélectionner un mot de passe. Assurez-vous que votre mot de passe répond aux exigences de complexité nécessaires décrites ci-dessous.`,
            OLD_PASSWORD: 'ancien mot de passe',
            ERROR_MESSAGE:
                'Vos informations ne correspondent pas à nos enregistrements. Veuillez saisir à nouveau vos informations pour réessayer.',
            PROBLEM_OCCURRED: 'Un problème est survenu:',
            CONFIRM_NEW_PASSWORD: 'Confirmer le nouveau mot de passe',
            NEW_PASSWORD: 'Nouveau mot de passe',
            CANCEL: 'Annuler',
            UPDATE: 'Mise à jour',
        },
        SETTINGS: {
            TITLE: 'Réglages',
        },
        LEGAL: {
            TITLE: 'Légale',
            TERMSANDCONDITIONS: 'Termes et conditions',
            EULA: "Contrat de licence de l'utilisateur final",
            OPENSOURCELICENSES: 'Licences Open Source',
        },
        USER_MENU: {
            LOG_OUT: 'Se déconnecter',
            CONTACT_US: 'Nous contacter',
            ACCOUNT_SETTING: 'Paramètres du compte',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'Questions générales',
            SUPPORT_MESSAGE:
                'Pour les questions, commentaires ou assistance par e-mail, veuillez nous envoyer un e-mail à ',
            EMERGENCY_SUPPORT: `Assistance d'urgence`,
            TECHNICAL_ASSISTANCE: 'Pour une assistance technique, veuillez appeler ',
        },
    },
};
export default resources;
