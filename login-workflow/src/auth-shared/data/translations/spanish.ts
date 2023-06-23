import { LanguageFile } from './types';

const resources: LanguageFile = {
    translation: {
        ACTIONS: {
            FINISH: 'Terminar',
            NEXT: 'Siguiente',
            BACK: 'Atrás',
            CREATE_ACCOUNT: 'Crear una cuenta',
            OKAY: 'Okey',
            CANCEL: 'Cancelar',
            CONTINUE: 'Seguir',
            DONE: 'Hecho',
            LOG_IN: 'Iniciar sesión',
            LOG_OUT: 'Cerrar sesión',
            CLICK_BUTTON: '¡Haga clic en el botón',
            UPDATE_REDUX: '¡Haga clic en el botón para actualizar el valor de la tienda redux!',
            CHANGE_LANGUAGE: '¡Cambie el idioma aquí!',
            GO_HOME: 'Ir a casa',
            GO_TEST: 'Ir a la página de prueba',
            RESEND: 'Enviar de nuevo',
            UPDATE: 'Actualizar',
            REMEMBER: 'Recordar contraseña',
        },
        LABELS: {
            EMAIL: 'Correo electrónico',
            USERNAME: 'Nombre de usuario',
            PASSWORD: 'Contraseña',
            CURRENT_PASSWORD: 'Contraseña actual',
            NEW_PASSWORD: 'Nueva contraseña',
            OPTIONAL: 'Opcional',
            FORGOT_PASSWORD: '¿Ha olvidado su contraseña?',
            NEED_ACCOUNT: '¿Necesitas una cuenta?',
            VIEW_ALL_EVENTS: 'Ver todos los {{count}} eventos',
        },
        MESSAGES: {
            EMAIL_SENT: 'Correo electrónico enviado',
            WELCOME: 'Bienvenido',
            WELCOME_PROJECT: 'Bienvenido a {{project}}',
            LOGIN_MESSAGE: 'Has iniciado sesión',
            CONGRATS: '¡Felicitaciones!',
            CONTACT: 'Contactar un representante de soporte de Eaton',
            ERROR: '¡Error!',
            EMAIL_ENTRY_ERROR: 'Ingrese un correo electrónico válido',
            USERNAME_ENTRY_ERROR: 'Introduzca un nombre de usuario válido',
            SUCCESS: 'Éxito',
            FAILURE: 'Fallo',
            LOADING: 'Cargando...',
            REQUEST_ERROR: 'Lo sentimos, hubo un problema al enviar su solicitud.',
        },
        REGISTRATION: {
            EULA: {
                LOADING: 'Cargando Acuerdo de licencia de usuario final...',
                AGREE_TERMS: 'He leído y acepto los Términos y condiciones',
            },
            STEPS: {
                CREATE_ACCOUNT: 'Crear una cuenta',
                VERIFY_EMAIL: 'Verificar correo electrónico',
                LICENSE: 'Acuerdo de licencia',
                PASSWORD: 'Crear contraseña',
                ACCOUNT_DETAILS: 'Detalles de la cuenta',
                COMPLETE: '¡Cuenta creada!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Ingrese sus datos en seguida para completar la creación de la cuenta',
            },
            SUCCESS_MESSAGE:
                'Su cuenta se ha creado correctamente con el correo electrónico <b> {{email}} </b>.\n\nTu cuenta ya se ha agregado a la organización <b> {{organization}} </b>.\n\nPulse continuar para finalizar. ',
            SUCCESS_MESSAGE_ALT:
                'Su cuenta se ha creado correctamente con el correo electrónico <1> {{email}} </1>.\n\nTu cuenta ya se ha agregado a la organización <3> {{organization}} </3>.\n\nPulse continuar para finalizar. ',
            SUCCESS_EXISTING:
                'Tu cuenta ha sido creada con éxito. Inicie sesión con el correo electrónico y la contraseña de su cuenta Eaton. ',
            FAILURE_MESSAGE: 'No pudimos completar su registro. Pulse continuar para terminar. ',
            UNKNOWN_EMAIL: 'Correo electrónico desconocido',
            UNKNOWN_ORGANIZATION: 'Organización desconocida',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS: `Para registrarse para una cuenta Eaton, introduzca la información requerida abajo. Deberá verificar su dirección de correo electrónico para continuar.`,
            VERIFY_EMAIL: {
                MESSAGE: `Se ha enviado un código de verificación a la dirección de correo electrónico que proporcionó. Haga clic en el enlace o ingrese el código abajo para continuar. Este código es válido por 30 minutos.`,
                RESEND: 'Reenviar correo electrónico de verificación',
                VERIFICATION_CODE_PROMPT: '¿No recibiste un correo electrónico?',
                VERIFICATION: 'Código de verificación',
            },
        },
        FORGOT_PASSWORD: {
            ERROR: 'No se pudo restablecer su contraseña en este momento.',
            INSTRUCTIONS:
                'Por favor ingrese el correo electrónico de la cuenta asociado con la cuenta.\n\n' +
                'Si este correo electrónico tiene una cuenta con Eaton, recibirá una respuesta dentro de <b> un día hábil </b>.\n\n' +
                'Para problemas urgentes con la cuenta, llame al {{phone}}.',
            INSTRUCTIONS_ALT:
                'Por favor ingrese el correo electrónico de la cuenta asociado con la cuenta. <br/> <br/>' +
                'Si este correo electrónico tiene una cuenta con Eaton, recibirá una respuesta dentro de <1> {{responseTime}} </1>. <br/> <br/>' +
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
        FORMS: {
            FIRST_NAME: 'Nombre',
            LAST_NAME: 'Apellido',
            PHONE_NUMBER: 'Número de teléfono',
            PASSWORD: 'Contraseña',
            CONFIRM_PASSWORD: 'Confirmar contraseña',
            PASS_MATCH_ERROR: 'Las contraseñas no coinciden',
            TOGGLE_PASSWORD_VISIBILITY: 'Alternar visibilidad de contraseña',
            RESET_PASSWORD: 'Restablecer contraseña',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 caracteres',
            NUMBERS: 'Un número',
            UPPER: 'Una letra mayúscula',
            LOWER: 'Una letra minúscula',
            SPECIAL: 'Un carácter especial',
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
