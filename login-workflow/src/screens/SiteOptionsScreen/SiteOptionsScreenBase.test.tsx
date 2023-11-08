import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { SiteOptionsScreenBase } from './SiteOptionsScreenBase';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';

afterEach(cleanup);

describe('Forgot Password Screen Base', () => {
    it('renders without crashing', () => {
        render(
            <SiteOptionsScreenBase
                icon={<ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />}
                message={`Now that you've specified your account details, you need to add your Organization details.`}
                WorkflowCardHeaderProps={{ title: 'Join an Organization' }}
                WorkflowCardActionsProps={{
                    showNext: true,
                    nextLabel: 'Join Existing Organization',
                    canGoNext: true,
                    showPrevious: true,
                    previousLabel: 'Create a New Organization',
                    canGoPrevious: true,
                }}
            />
        );
        expect(screen.getByText('Join an Organization')).toBeInTheDocument();
        expect(screen.getByText('Join Existing Organization')).toBeInTheDocument();
        expect(screen.getByText(/Join Existing Organization/i)).toBeEnabled();
        expect(screen.getByText('Create a New Organization')).toBeInTheDocument();
        expect(screen.getByText(/Create a New Organization/i)).toBeEnabled();
    });
});
