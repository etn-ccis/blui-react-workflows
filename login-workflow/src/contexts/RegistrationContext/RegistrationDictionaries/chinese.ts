import { RegistrationLanguageFile } from './types';

const resources: RegistrationLanguageFile = {
    translation: {
        REGISTRATION: {
            EULA: {
                LOADING: '正在加载最终用户许可协议……',
                AGREE_TERMS: '我已阅读并同意条款及细则',
            },
            STEPS: {
                CREATE_ACCOUNT: '创建账号',
                VERIFY_EMAIL: '验证邮箱',
                LICENSE: '许可协议',
                PASSWORD: '创建密码',
                ACCOUNT_DETAILS: '账号信息',
                COMPLETE: '成功建立账号！',
            },
            INSTRUCTIONS: {
                ACCOUNT_DETAILS: '请输入下列个人信息来完成账号注册。',
                PASSWORD_INFO: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
            },
            SUCCESS_MESSAGE:
                '您已成功使用<b>{{email}}</b>注册了一个新账号。\n\n您的账号已被加入“<b>{{organization}}</b>”。\n\n请点击“继续”完成注册。',
            SUCCESS_MESSAGE_ALT:
                '您已成功使用<1>{{email}}</1>注册了一个新账号。\n\n您的账号已被加入“<3>{{organization}}</3>”。\n\n请点击“继续”完成注册。',
            SUCCESS_EXISTING: '您已成功建立账号。请使用您的伊顿账号邮箱和密码登录。',
            FAILURE_MESSAGE: '无法完成注册。请点击“继续”退出。',
            UNKNOWN_EMAIL: '未知邮箱地址',
            UNKNOWN_ORGANIZATION: '未知组织',
        },
        SELF_REGISTRATION: {
            INSTRUCTIONS: `请输入下列信息以注册伊顿账号。您需要先验证您的邮箱地址。`,
            VERIFY_EMAIL: {
                MESSAGE:
                    '已向您的邮箱中发送了一封验证邮件。请点击邮件中的链接，或者在此输入邮件中的验证码。验证邮件在30分钟内有效。',
                RESEND: '重新发送验证邮件',
                VERIFICATION_CODE_PROMPT: '没有收到电子邮件？',
                VERIFICATION: '验证码',
                CODE_VALIDATOR_ERROR: '请输入有效验证码',
            },
        },
    },
};
export default resources;
