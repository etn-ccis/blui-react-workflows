import React, { useEffect } from 'react';
import { AppContextProviderProps } from './types';
import { AppContext } from './context';
import { I18nextProvider } from 'react-i18next';
import{ i18nAppInstance} from './i18nAppInstance';

export const AppContextProvider: React.FC<React.PropsWithChildren<AppContextProviderProps>> = (props) => {
    const { children, ...appContextProps } = props;
    const { language, i18n = i18nAppInstance} = props;
    
    useEffect(() => {
        void i18n.changeLanguage(language);
    }, [i18n, language]);

    return (
        <I18nextProvider i18n={i18n}>
            <AppContext.Provider value={appContextProps}>
                {children}
            </AppContext.Provider>
        </I18nextProvider>
    );
};
