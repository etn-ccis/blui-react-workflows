import React from 'react';
import { render } from '@testing-library/react';
import { ExistingAccountSuccessScreen } from './ExistingAccountSuccessScreen';
import { RegistrationContextProvider } from '../../contexts';
import { registrationContextProviderProps } from '../../testUtils';

describe('ExistingAccountSuccessScreen', () => {
    it('rendering the screen without any props', () => {
        render(
            <RegistrationContextProvider {...registrationContextProviderProps}>
                <ExistingAccountSuccessScreen />
            </RegistrationContextProvider>
        );
    });
});
