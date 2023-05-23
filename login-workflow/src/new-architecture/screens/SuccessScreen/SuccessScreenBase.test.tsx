import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import { SuccessScreenBase } from './SuccessScreenBase';

afterEach(cleanup);

describe('SuccessScreenBase tests', () => {
    it('renders without crashing', () => {
        render(
            <SuccessScreenBase
                WorkflowCardHeaderProps={{ title: 'Test' }}
                WorkflowCardActionsProps={{
                    nextLabel: 'Continue',
                    onNext: (): void => {},
                }}
                icon={<></>}
                messageTitle="Welcome"
                message="This is welcome page"
            />
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
