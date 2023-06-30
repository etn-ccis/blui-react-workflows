import React from 'react';
import { render } from '@testing-library/react';
import { ExistingAccountSuccessScreen } from './ExistingAccountSuccessScreen';
import { RegistrationContextProvider } from '../../contexts';
import { defaultProps } from '../../contexts/RegistrationContext/RegistrationContextProvider.test';

describe('ExistingAccountSuccessScreen', () => {
    it('rendering the screen without any props', () => {
        render(
            <RegistrationContextProvider {...defaultProps}>
                <ExistingAccountSuccessScreen />
            </RegistrationContextProvider>
        );
    });
});
