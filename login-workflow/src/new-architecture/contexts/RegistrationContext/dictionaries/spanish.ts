import { RegistrationLanguageFile } from './types';

const resources: RegistrationLanguageFile = {
    translation: {
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
                PASSWORD_INFO:
                    'Por favor, seleccione una contraseña. Asegúrese de que su contraseña cumple con los requisitos de complejidad necesarios que se describen a continuación. ',
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
                RESEND: 'Enviar de nuevo',
                VERIFICATION_CODE_PROMPT: '¿No recibiste un correo electrónico?',
                VERIFICATION: 'Código de verificación',
                CODE_VALIDATOR_ERROR: 'Debe proporcionar un código válido',
            },
        },
    },
};
export default resources;
