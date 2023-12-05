import { CommonTranslationsFile } from './types';

const resources: CommonTranslationsFile = {
    translation: {
        ACTIONS: {
            FINISH: '完成',
            NEXT: '继续',
            BACK: '返回',
            CANCEL: '取消',
            CREATE_ACCOUNT: '创建账号',
            OKAY: '好的',
            DONE: '完成',
            CONTINUE: '继续',
            LOG_IN: '登录',
            LOG_OUT: '登出',
            CLICK_BUTTON: '点击按钮',
            UPDATE_REDUX: '点击按钮以更新redux中存的值',
            CHANGE_LANGUAGE: '更改语言设置',
            GO_HOME: '进入主页',
            GO_TEST: '进入测试页面',
            RESEND: '重新发送',
            UPDATE: '更新',
            REMEMBER: '记住我的登录信息',
            SUBMIT: '提交',
        },
        LABELS: {
            EMAIL: '邮箱地址',
            USERNAME: '用户名',
            PASSWORD: '密码',
            CURRENT_PASSWORD: '当前密码',
            NEW_PASSWORD: '新密码',
            OPTIONAL: '可选',
            FORGOT_PASSWORD: '忘记密码？',
            NEED_ACCOUNT: '新用户？',
            VIEW_ALL_EVENTS: '查看共{{count}}个事件',
            ORG_NAME: '组织名称',
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
            LOADING: '正在加载……',
            REQUEST_ERROR: '抱歉，发送您的请求时出现了程序错误。',
            PASSWORD_REQUIRED_ERROR: '密码为必填项',
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
            FIRST_NAME_LENGTH_ERROR: '名字必须至少包含1个字符',
            LAST_NAME_LENGTH_ERROR: '姓氏必须至少包含1个字符',
        },
        PASSWORD_REQUIREMENTS: {
            LENGTH: '8至16个字符',
            NUMBERS: '1个数字',
            UPPER: '1个大写字母',
            LOWER: '1个小写字母',
            SPECIAL: '1个特殊字符',
        },
    },
};
export default resources;
