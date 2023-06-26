import { LanguageFile } from './types';

const resources: LanguageFile = {
    translation: {
        ACTIONS: {
            FINISH: '完成',
            NEXT: '下一步',
            BACK: '上一步',
            CANCEL: '取消',
            CREATE_ACCOUNT: '创建账号',
            OKAY: '好的',
            DONE: '完成',
            CONTINUE: '继续',
            LOG_IN: '登录',
            LOG_OUT: '登出',
            CLICK_BUTTON: '点击按钮',
            UPDATE_REDUX: '点击按钮以更新redux中存的值！',
            CHANGE_LANGUAGE: '更改语言设置！',
            GO_HOME: '进入主页',
            GO_TEST: '进入测试页面',
            RESEND: '重新发送',
            UPDATE: '更新',
            REMEMBER: '记住我的登录信息',
        },
        LABELS: {
            EMAIL: '邮箱地址',
            USERNAME: '用户名',
            PASSWORD: '密码',
            CURRENT_PASSWORD: '当前密码',
            NEW_PASSWORD: '新密码',
            OPTIONAL: '可选',
            FORGOT_PASSWORD: '忘记密码？',
            NEED_ACCOUNT: '需要建立新账号？',
            VIEW_ALL_EVENTS: '查看共{{count}}个事件',
        },
        MESSAGES: {
            EMAIL_SENT: '邮件已发送',
            WELCOME: '欢迎',
            WELCOME_PROJECT: '欢迎来到{{project}}',
            LOGIN_MESSAGE: '您已登录',
            CONGRATS: '恭喜！',
            CONTACT: '联系伊顿客服人员',
            ERROR: '错误！',
            EMAIL_ENTRY_ERROR: '请输入有效的电子邮件地址',
            USERNAME_ENTRY_ERROR: '请输入有效的用户名',
            SUCCESS: '成功',
            FAILURE: '失败',
            LOADING: '正在加载中……',
            REQUEST_ERROR: '抱歉，发送您的请求时出现了程序错误。',
        },
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
            },
        },
        FORGOT_PASSWORD: {
            ERROR: '目前无法重置您的密码。',
            INSTRUCTIONS:
                '请输入账户邮箱地址。\n\n' +
                '如果伊顿系统中存在此邮箱地址注册的账号的话，您会在<b>一个工作日</b>内收到我们的回复。\n\n' +
                '如遇紧急账户问题，请拨打联系电话{{phone}}。',
            INSTRUCTIONS_ALT:
                '请输入账户邮箱地址。<br/><br/>' +
                '如果伊顿系统中存在此邮箱地址注册的账号的话，您会在<1>{{responseTime}}</1>内收到我们的回复。<br/><br/>' +
                '如遇紧急账户问题，请拨打联系电话<4>{{phone}}</4>。',
            RESET_CODE_ERROR: '您的密码重置链接无效。',
            LINK_SENT: '已向<b>{{email}}</b>发送了密码重置链接。',
            LINK_SENT_ALT: '已向<1>{{email}}</1>发送了密码重置链接。',
        },
        LOGIN: {
            INCORRECT_CREDENTIALS: '邮箱地址或密码错误',
            INVALID_CREDENTIALS: '您的用户名或密码错误。',
            GENERIC_ERROR: '当前无法处理您的请求。',
        },
        FORMS: {
            FIRST_NAME: '名',
            LAST_NAME: '姓',
            PHONE_NUMBER: '手机号码',
            PASSWORD: '密码',
            CONFIRM_PASSWORD: '确认密码',
            PASS_MATCH_ERROR: '密码不匹配',
            TOGGLE_PASSWORD_VISIBILITY: '显示密码',
            RESET_PASSWORD: '重置密码',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8至16个字符',
            NUMBERS: '1个数字',
            UPPER: '1个大写字母',
            LOWER: '1个小写字母',
            SPECIAL: '1个特殊字符',
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
