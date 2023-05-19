import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { SuccessScreenBase } from './SuccessScreenBase';

afterEach(cleanup);

describe('SuccessScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <SuccessScreenBase
                title="Test"
                icon={<></>}
                messageTitle="Welcome"
                message="This is welcome page"
                dismissButtonLabel="Continue"
                onDismiss={(): void => {}}
            />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
