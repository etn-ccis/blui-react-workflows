import React from 'react';
import 'regenerator-runtime/runtime';
import { render, cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SuccessScreenBase } from './SuccessScreenBase';

afterEach(cleanup);

describe('SuccessScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <SuccessScreenBase
                title="Test"
                icon={<></>}
                successMessageTitle="Welcome"
                successMessage="This is welcome page"
                dismissButtonLabel="Continue"
                onDismiss={(): void => {}}
            />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
