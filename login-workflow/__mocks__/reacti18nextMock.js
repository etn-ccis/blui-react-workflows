const reactI18Next = jest.createMockFromModule('react-i18next');

reactI18Next.useTranslation = () => {
    return {
        t: (str) => str,
        i18n: {
            changeLanguage: () => new Promise(() => {}),
        },
    };
};

reactI18Next.Trans = () => (Component) => (props) => (
    <Component t={() => ''} {...props}>
        {props.children}
    </Component>
);

module.exports = reactI18Next;

export default {};
