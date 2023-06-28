import React from 'react';
import { render } from '@testing-library/react';
import { ExistingAccountSuccessScreen } from './ExistingAccountSuccessScreen';
import { RegistrationContextProvider, RegistrationContextProviderProps } from '../../contexts';

export const defaultProps: RegistrationContextProviderProps = {
    language: 'en',
    navigate: jest.fn(),
    routeConfig: {},
    actions: jest.fn(),
};

describe('ExistingAccountSuccessScreen', () => {
    it('rendering the screen without any props', () => {
        render(
            <RegistrationContextProvider {...defaultProps}>
                <ExistingAccountSuccessScreen />
            </RegistrationContextProvider>
        );
    });
});
