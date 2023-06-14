import { AuthLanguageFile } from './types';

const resources: AuthLanguageFile = {
    translation: {
        FORGOT_PASSWORD: {
            ERROR: 'No se pudo restablecer su contraseña en este momento.',
            INSTRUCTIONS:
                'Por favor ingrese el correo electrónico de la cuenta asociado con la cuenta.\n\n' +
                'Si este correo electrónico tiene una cuenta con Eaton, recibirá una respuesta dentro de <b> un día hábil </b>.\n\n' +
                'Para problemas urgentes con la cuenta, llame al {{phone}}.',
            INSTRUCTIONS_ALT:
                'Por favor ingrese el correo electrónico de la cuenta asociado con la cuenta. <br/> <br/>' +
                'Si este correo electrónico tiene una cuenta con Eaton, recibirá una respuesta dentro de <1> un día hábil </1>. <br/> <br/>' +
                'Para problemas urgentes con la cuenta, llame al <4> {{phone}} </4>.',
            RESET_CODE_ERROR: 'Hubo un error con su código de reinicio. ',
            LINK_SENT: 'Se envió un vínculo para restablecer su contraseña a <b> {{email}} </b>.',
            LINK_SENT_ALT: 'Se envió un vínculo para restablecer su contraseña a <1> {{email}} </1>.',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: 'Correo electrónico o contraseña incorrectos',
            INVALID_CREDENTIALS: 'No se reconoce su combinación de nombre de usuario / contraseña.',
            GENERIC_ERROR: 'Su solicitud no se pudo procesar en este momento.',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'Tu contraseña se restableció correctamente.',
            FAILURE_MESSAGE: 'No se pudo restablecer su contraseña. Por favor, inténtelo de nuevo más tarde.',
        },
        USER_SETTINGS: {
            NAME: 'Nombre',
            EMAIL: 'Correo electrónico',
            PHONE_NUMBER: 'Número de teléfono',
            PASSWORD: 'Contraseña',
            EMAIL_NOTIFICATION: 'Notificación por correo electrónico',
            ENABLED: 'Habilitado',
            ORGANIZATION: 'Organización',
            ORGANIZATION_NAME: 'Nombre de la organización',
            ADDRESS: 'Dirección',
            CHANGE_PASSWORD: 'Cambiar contraseña',
            ACCOUNT: 'Cuenta',
        },
        COUNTER: 'El valor es: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Olvidé mi contraseña',
        },
        ERROR_MESSAGES: {
            '2002': 'El enlace de registro de usuario ya está canjeado.',
            '9003': 'No se puede realizar la operación solicitada, por favor contacte su administrador',
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Contraseña cambiada',
            PASSWORD: 'Cambiar contraseña',
            SUCCESS_MESSAGE:
                '¡Su contraseña se actualizó correctamente! Para garantizar la seguridad de su cuenta, deberá iniciar sesión en la aplicación con sus credenciales actualizadas.',
            EMAIL_CONFIRM_MESSAGE: 'Hemos enviado un correo electrónico de confirmación a <b> {{email}} </b>',
            PASSWORD_INFO:
                'Por favor, seleccione una contraseña. Asegúrese de que su contraseña cumple con los requisitos de complejidad necesarios que se describen a continuación. ',
            OLD_PASSWORD: 'Contraseña anterior',
            ERROR_MESSAGE: `Su información no coincide con nuestros registros. Vuelva a ingresar su información para volver a intentarlo.`,
            PROBLEM_OCCURRED: 'Ocurrió un problema:',
            CONFIRM_NEW_PASSWORD: 'Confirmar nueva contraseña',
            NEW_PASSWORD: 'Nueva contraseña',
            CANCEL: 'Cancelar',
            UPDATE: 'Actualizar',
        },
        SETTINGS: {
            TITLE: 'Configuración',
        },
        LEGAL: {
            TITLE: 'Legal',
            TERMSANDCONDITIONS: 'Términos y condiciones',
            EULA: 'Acuerdo de licencia de usuario final',
            OPENSOURCELICENSES: 'Licencias de código abierto',
        },
        USER_MENU: {
            LOG_OUT: 'Cerrar sesión',
            CONTACT_US: 'Contáctenos',
            ACCOUNT_SETTING: 'Configuración de la cuenta',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'Preguntas generales',
            SUPPORT_MESSAGE: 'Si tiene preguntas, comentarios o necesita asistencia, envíenos un correo electrónico a ',
            EMERGENCY_SUPPORT: 'Soporte de emergencia',
            TECHNICAL_ASSISTANCE: 'Para obtener asistencia técnica, llame a ',
        },
    },
};
export default resources;
