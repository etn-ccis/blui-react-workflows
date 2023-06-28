import { RegistrationLanguageFile } from './types';

const resources: RegistrationLanguageFile = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: 'A carregar Contrato de Licença de Utilizador Final...',
                AGREE_TERMS: 'Li e concordo com os Termos e Condições',
            },
            STEPS: {
                CREATE_ACCOUNT: 'Criar conta',
                VERIFY_EMAIL: 'Verificar E-mail',
                LICENSE: 'Licença',
                PASSWORD: 'Criar palavra-passe',
                ACCOUNT_DETAILS: 'Detalhes de conta',
                COMPLETE: 'Conta criada!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Introduza detalhes para concluir a criação da sua conta.',
                PASSWORD_INFO:
                    'Por favor selecione uma palavra-passe. Certifique-se de que sua senha atenda aos requisitos de complexidade necessários descritos abaixo.',
            },
            SUCCESS_MESSAGE:
                'A sua conta foi criada corretamente com o e-mail <b>{{email}}</b>.\n\nA sua conta já foi adicionada à organização <b>{{organization}}</b>.\n\nClique em continuar para concluir.',
            SUCCESS_MESSAGE_ALT:
                'A sua conta foi criada corretamente com o e-mail <1>{{email}}</1>.\n\nA sua conta já foi adicionada à organização <3>{{organization}}</3>.\n\nClique em continuar para concluir.',
            SUCCESS_EXISTING:
                'A sua conta foi criada corretamente. Por favor inicie sessão com o e-mail e palavra-passe da sua conta Eaton.',
            FAILURE_MESSAGE: 'Foi impossível concluir o seu registo. Clique em continuar para concluir.',
            UNKNOWN_EMAIL: 'E-mail desconhecido',
            UNKNOWN_ORGANIZATION: 'Organização desconhecida',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS:
                'Para se registar para uma conta Eaton, insira a informação obrigatória nos campos abaixo. Será necessário verificar o e-mail para continuar.',
            VERIFY_EMAIL: {
                MESSAGE:
                    'Foi enviado um código de verificação para o e-mail que indicou. Clique no link ou preencha o campo com o código para continuar. Este código é válido durante 30 minutos.',
                RESEND: 'Reenviar e-mail de verificação',
                VERIFICATION_CODE_PROMPT: 'Não recebeu um e-mail?',
                VERIFICATION: 'Código de verificação',
                CODE_VALIDATOR_ERROR: 'Você deve fornecer um código válido',
            },
        },
    },
};
export default resources;
