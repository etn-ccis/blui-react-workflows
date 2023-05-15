import { AuthLanguageFile } from './types';

const resources: AuthLanguageFile = {
    translation: {
        ACTIONS: {
            FINISH: 'Concluir',
            NEXT: 'Próximo',
            BACK: 'Anterior',
            CREATE_ACCOUNT: 'Criar Conta',
            OKAY: 'OK',
            CANCEL: 'Cancelar',
            CONTINUE: 'Continuar',
            DONE: 'Concluir',
            LOG_IN: 'Iniciar Sessão',
            LOG_OUT: 'Terminar Sessão',
            CLICK_BUTTON: 'Clique no botão',
            UPDATE_REDUX: 'Clique no botão para atualizar o valor de armazenamento redux!',
            CHANGE_LANGUAGE: 'Alterar idioma aqui!',
            GO_HOME: 'Ir para a Página Principal',
            GO_TEST: 'Ir para a Página de testes',
            RESEND: 'Envie novamente',
            UPDATE: 'Atualizar',
            REMEMBER: 'Lembrar-me',
        },
        LABELS: {
            EMAIL: 'E-mail',
            USERNAME: 'Nome de Utilizador',
            PASSWORD: 'Palavra-passe',
            CURRENT_PASSWORD: 'Palavra-passe atual',
            NEW_PASSWORD: 'Nova Palavra-passe',
            OPTIONAL: 'Opcional',
            FORGOT_PASSWORD: 'Esqueceu-se da sua palavra-passe?',
            NEED_ACCOUNT: 'Precisa de uma conta?',
            VIEW_ALL_EVENTS: 'Ver todos os {{count}} Eventos',
        },
        MESSAGES: {
            EMAIL_SENT: 'E-mail enviado',
            WELCOME: 'Bem vindo',
            WELCOME_PROJECT: 'Bem vindo ao {{project}}',
            LOGIN_MESSAGE: 'Iniciou sessão!',
            CONGRATS: 'Parabéns!',
            CONTACT: 'Contacte um representante do apoio técnico da Eaton',
            ERROR: 'Erro!',
            EMAIL_ENTRY_ERROR: 'Por favor insira um e-mail válido',
            USERNAME_ENTRY_ERROR: 'Insira um nome de usuário válido',
            SUCCESS: 'Sucesso',
            FAILURE: 'Falha',
            LOADING: 'A carregar...',
            REQUEST_ERROR: 'Pedimos desculpa, existe um problema ao submeter o seu pedido',
        },
        FORGOT_PASSWORD: {
            ERROR: 'De momento, não foi possível redefinir a sua palavra-passe.',
            INSTRUCTIONS:
                'Por favor, insira o e-mail associado com a conta.\n\n' +
                'Se este e-mail tem uma conta com a Eaton, irá receber uma resposta dentro de <1>um dia útil</1>.\n\n' +
                'Para assuntos urgentes relacionados com a sua conta, por favor contacte <4>{{phone}}</4>.',
            INSTRUCTIONS_ALT:
                'Por favor, insira o e-mail associado com a conta.<br/><br/>' +
                'Se este e-mail tem uma conta com a Eaton, irá receber uma resposta dentro de <1>um dia útil</1>.\n\n' +
                'Para assuntos urgentes relacionados com a sua conta, por favor contacte {{phone}}.',
            RESET_CODE_ERROR: 'Houve um problema com o código de redefinição.',
            LINK_SENT: 'Um link para redefinir a palavra-passe foi enviado para <b>{{email}}</b>.',
            LINK_SENT_ALT: 'Um link para redefinir a palavra-passe foi enviado para <1>{{email}}</1>.',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: 'E-mail ou palavra-passe incorretos.',
            INVALID_CREDENTIALS: 'A combinação nome de utilizador/palavra-passe não é reconhecível',
            GENERIC_ERROR: 'De momento, o seu pedido não pôde ser processado.',
        },
        FORMS: {
            FIRST_NAME: 'Primeiro Nome',
            LAST_NAME: 'Apelido',
            PHONE_NUMBER: 'Número de telefone',
            PASSWORD: 'Palavra-passe',
            CONFIRM_PASSWORD: 'Confirmar palavra-passe',
            PASS_MATCH_ERROR: 'Palavras-passe não coincidem',
            TOGGLE_PASSWORD_VISIBILITY: 'Ative a visibilidade da palavra-passe',
            RESET_PASSWORD: 'Redefinir Palavra-passe',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8-16 caracteres',
            NUMBERS: 'Um número',
            UPPER: 'Uma letra maiúscula',
            LOWER: 'Uma letra minúscula',
            SPECIAL: 'Um caracter especial',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: 'A sua palavra-passe foi corretamente redefinida.',
            FAILURE_MESSAGE: 'A redefinição da sua palavra-passe falhou. Por favor, tente novamente mais tarde.',
        },
        USER_SETTINGS: {
            NAME: 'Nome',
            EMAIL: 'E-mail',
            PHONE_NUMBER: 'Número de Telefone',
            PASSWORD: 'Palavra-passe',
            EMAIL_NOTIFICATION: 'Notificação de E-mail',
            ENABLED: 'Permitido',
            ORGANIZATION: 'Organização',
            ORGANIZATION_NAME: 'Nome da Organização',
            ADDRESS: 'Morada',
            CHANGE_PASSWORD: 'Alterar palavra-passe',
            ACCOUNT: 'Conta',
        },
        COUNTER: 'O valor é: {{count}}',
        HEADER: {
            FORGOT_PASSWORD: 'Esquecer palavra-passe',
        },
        ERROR_MESSAGES: {
            '2002': 'Link para registo de novo utilizador recuperado.',
            '9003': 'Não é possível concluir a operação requisitada, por favor contacte o administrador.',
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: 'Palavra-passe alterada',
            PASSWORD: 'Alterar Palavra-passe',
            SUCCESS_MESSAGE:
                'A sua palavra-passe foi atualizada! Para assegurar a segurança da sua conta, terá de iniciar sessão na aplicação com as suas credenciais atualizadas.',
            EMAIL_CONFIRM_MESSAGE: 'Enviámos um e-mail de confirmação para <b>{{email}}</b>',
            PASSWORD_INFO:
                'Por favor selecione uma palavra-passe. Certifique-se de que sua senha atenda aos requisitos de complexidade necessários descritos abaixo.',
            OLD_PASSWORD: 'Palavra-passe anterior',
            ERROR_MESSAGE:
                'A sua informação não corresponde aos nossos registos. Por favor, confirme as informações e tente de novo.',
            PROBLEM_OCCURRED: 'Ocorreu um problema:',
            CONFIRM_NEW_PASSWORD: 'Confirmar nova palavra-passe',
            CANCEL: 'Cancelar',
            UPDATE: 'Atualizar',
        },
        SETTINGS: {
            TITLE: 'Definições',
        },
        LEGAL: {
            TITLE: 'Legal',
            TERMSANDCONDITIONS: 'Termos e Condições',
            EULA: 'Contrato de Licença de Utilizador Final',
            OPENSOURCELICENSES: 'Licenças Código Aberto',
        },
        USER_MENU: {
            LOG_OUT: 'Terminar Sessão',
            CONTACT_US: 'Contacte-nos',
            ACCOUNT_SETTING: 'Definições de Conta',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: 'Questões Gerais',
            SUPPORT_MESSAGE: 'Para questões, comentários, ou apoio técnico, por favor envie um e-mail para ',
            EMERGENCY_SUPPORT: 'Apoio de Emergência',
            TECHNICAL_ASSISTANCE: 'Para apoio técnico, por favor contacte ',
        },
    },
};
export default resources;
