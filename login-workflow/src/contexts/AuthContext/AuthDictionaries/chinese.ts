import { AuthLanguageFile } from './types';

const resources: AuthLanguageFile = {
    translation: {
        FORGOT_PASSWORD: {
            ERROR: '目前无法重置您的密码。',
            INSTRUCTIONS:
                '请输入账户邮箱地址。\n\n' +
                '如果伊顿系统中存在此邮箱地址注册的账号的话，您会在<b>{{time}}</b>内收到我们的回复。\n\n' +
                '如遇紧急账户问题，请拨打联系电话{{phone}}。',
            INSTRUCTIONS_ALT:
                '请输入账户邮箱地址。<br/><br/>' +
                '如果伊顿系统中存在此邮箱地址注册的账号的话，您会在<1>{{time}}</1>内收到我们的回复。<br/><br/>' +
                '如遇紧急账户问题，请拨打联系电话<4>{{phone}}</4>。',
            RESET_CODE_ERROR: '您的密码重置链接无效。',
            LINK_SENT: '已向<b>{{email}}</b>发送了密码重置链接。',
            LINK_SENT_ALT: '已向<1>{{email}}</1>发送了密码重置链接。',
            RESPONSE_TIME: '一个工作日',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: '邮箱地址或密码错误',
            INVALID_CREDENTIALS: '您的用户名或密码错误。',
            GENERIC_ERROR: '当前无法处理您的请求。',
        },
        PASSWORD_RESET: {
            SUCCESS_MESSAGE: '已成功重置您的密码。',
            FAILURE_MESSAGE: '无法重置您的密码。请稍后重试。',
        },
        USER_SETTINGS: {
            NAME: '姓名',
            EMAIL: '邮箱地址',
            PHONE_NUMBER: '手机号码',
            PASSWORD: '密码',
            EMAIL_NOTIFICATION: '邮件通知',
            ENABLED: '启用',
            ORGANIZATION: '组织',
            ORGANIZATION_NAME: '组织名称',
            ADDRESS: '地址',
            CHANGE_PASSWORD: '修改密码',
            ACCOUNT: '账号',
        },
        COUNTER: '值为：{{count}}',
        HEADER: {
            FORGOT_PASSWORD: '忘记密码',
        },
        ERROR_MESSAGES: {
            '2002': '此邀请注册链接已被使用。',
            '9003': '无法完成请求。请联系您的系统管理员。',
        },
        CHANGE_PASSWORD: {
            PASSWORD_CHANGED: '密码已修改',
            PASSWORD: '修改密码',
            SUCCESS_MESSAGE: '已更新您的密码。安全起见，您需要用新密码重新登录。',
            EMAIL_CONFIRM_MESSAGE: '我们已向<b>{{email}}</b>发送确认信息。',
            PASSWORD_INFO: '请输入您的新密码。请确保您的新密码符合以下列出的密码复杂度要求。',
            OLD_PASSWORD: '旧密码',
            ERROR_MESSAGE: '您的信息与我们系统中存储的信息不符。请尝试重新输入您的信息。',
            PROBLEM_OCCURRED: '出现了一处问题：',
            CONFIRM_NEW_PASSWORD: '确认新密码',
            NEW_PASSWORD: '新密码',
            CANCEL: '取消',
            UPDATE: '更新',
        },
        SETTINGS: {
            TITLE: '设置',
        },
        LEGAL: {
            TITLE: '法律',
            TERMSANDCONDITIONS: '条款及细则',
            EULA: '最终用户许可协议',
            OPENSOURCELICENSES: '开源协议',
        },
        USER_MENU: {
            LOG_OUT: '登出',
            CONTACT_US: '联系我们',
            ACCOUNT_SETTING: '账号设置',
        },
        CONTACT_SUPPORT: {
            GENERAL_QUESTIONS: '一般问题',
            SUPPORT_MESSAGE: '如果您有疑问、建议或需要协助，欢迎用邮件联系我们：',
            EMERGENCY_SUPPORT: '紧急协助',
            TECHNICAL_ASSISTANCE: '如需技术协助，请拨打',
        },
    },
};
export default resources;
