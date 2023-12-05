import { RegistrationLanguageFile } from './types';

const resources: RegistrationLanguageFile = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: "Chargement du contrat de licence d'utilisateur final ...",
                AGREE_TERMS: "J'ai lu et j'accepte les conditions générales",
            },
            STEPS: {
                CREATE_ACCOUNT: 'Créer un compte',
                VERIFY_EMAIL: 'Vérifier les courriels',
                LICENSE: 'Accord de Licence',
                PASSWORD: ' Créer un Mot de Passe',
                ACCOUNT_DETAILS: 'Détails du Compte',
                COMPLETE: 'Compte Créé!',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: 'Entrez vos coordonnées ci-dessous pour terminer la création du compte.',
                PASSWORD_INFO: `Veuillez sélectionner un mot de passe. Assurez-vous que votre mot de passe répond aux exigences de complexité nécessaires décrites ci-dessous.`,
            },
            SUCCESS_MESSAGE:
                "Votre compte a été créé avec le courrier électronique <b>{{email}}</b>.\n\nVotre compte a déjà été ajouté à l'organisation <b>{{organization}}</b>.",
            SUCCESS_MESSAGE_ALT:
                "Votre compte a été créé avec le courrier électronique <1>{{email}}</1>.\n\nVotre compte a déjà été ajouté à l'organisation <3>{{organization}}</3>.",
            SUCCESS_MESSAGE_ALT_WITHOUT_EMAIL_PROVIDED:
                "Votre compte à été créé avec succès.\n\nVotre compte a déjà été ajouté à l'organisation <3>{{organization}}</3>.",
            SUCCESS_EXISTING: `Votre compte à été créé avec succès. Veuillez vous connecter avec l'adresse e-mail et le mot de passe de votre compte Eaton.`,
            FAILURE_MESSAGE:
                "Nous n'avons pas pu terminer votre inscription. Appuyez sur Continuer ci-dessous pour finir.",
            UNKNOWN_EMAIL: 'Email inconnu',
            UNKNOWN_ORGANIZATION: 'Organisation inconnue',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS: `Pour vous inscrire à un compte Eaton, entrez les informations requises ci-dessous. Vous devrez vérifier votre adresse e-mail pour continuer.`,
            VERIFY_EMAIL: {
                MESSAGE: `Un code de vérification a été envoyé à l'adresse e-mail que vous avez fournie. Cliquez sur le lien ou entrez le code ci-dessous pour continuer. Ce code est valable 30 minutes.`,
                RESEND: `Renvoyer l'e-mail de vérification`,
                VERIFICATION_CODE_PROMPT: "Vous n'avez pas reçu d'e-mail ?",
                VERIFICATION: 'Code de vérification',
                CODE_VALIDATOR_ERROR: 'Vous devez fournir un code valide',
            },
            NEW_ORG: {
                SCREEN_TITLE: 'Créer une Organisation',
                MESSAGE_1:
                    'Maintenant que vous avez spécifié les détails de votre compte, vous devez ajouter les détails de votre organisation.',
                MESSAGE_2: 'Saisissez le nom de votre organisation pour continuer la création de votre compte.',
                MESSAGE_3: `Si votre organisation existe déjà, demandez à votre administrateur de vous fournir un Code d'Enregistrement.`,
                ORG_NAME_ENTRY_ERROR: `Veuillez entrer un nom d'organisation valide`,
            },
        },
    },
};
export default resources;
