import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ContactScreenBase } from './ContactSupportScreenBase';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';

afterEach(cleanup);

describe('ContactScreenBase tests', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });
    it('rendering the screen without any props', () => {
        render(<ContactScreenBase />);
    });

    it('renders without crashing', () => {
        render(
            <ContactScreenBase
                WorkflowCardHeaderProps={{ title: 'Test Contact Us' }}
                icon={<ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />}
                emailSupportTitle="General Questions"
                phoneSupportTitle="Emergency Support"
                contactEmail="something@email.com"
                contactPhone="1-800-123-4567"
                dismissButtonLabel="Okay"
                WorkflowCardActionsProps={{
                    nextLabel: 'Okay',
                    showNext: true,
                    canGoNext: true,
                    onNext: (): void => {},
                    fullWidthButton: true,
                }}
            />
        );
        expect(screen.getByText('Test Contact Us')).toBeInTheDocument();
        expect(screen.getByText('General Questions')).toBeInTheDocument();
        expect(screen.getByText('something@email.com')).toBeInTheDocument();
        expect(screen.getByText('Emergency Support')).toBeInTheDocument();
        expect(screen.getByText('1-800-123-4567')).toBeInTheDocument();
        expect(screen.getByText('Okay')).toBeInTheDocument();
        expect(screen.getByText(/Okay/i)).toBeEnabled();
    });
    it('calls onNext when the Okay button is clicked', () => {
        const { getByText } = render(
            <ContactScreenBase
                WorkflowCardActionsProps={{
                    onNext: mockOnNext(),
                    showNext: true,
                    nextLabel: 'Okay',
                }}
            />
        );

        const nextButton = getByText('Okay');
        fireEvent.click(nextButton);

        expect(mockOnNext).toHaveBeenCalled();
    });
});
