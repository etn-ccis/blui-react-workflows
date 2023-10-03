import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import { ContactSupportScreenBase } from './ContactSupportScreenBase';
import ChatBubbleOutline from '@mui/icons-material/ChatBubbleOutline';
import Typography from '@mui/material/Typography';

afterEach(cleanup);

describe('ContactSupportScreenBase tests', () => {
    let mockOnNext: any;

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeEach(() => {
        mockOnNext = jest.fn();
    });
    it('rendering the screen without any props', () => {
        render(<ContactSupportScreenBase />);
    });

    it('renders without crashing', () => {
        render(
            <ContactSupportScreenBase
                WorkflowCardHeaderProps={{ title: 'Test Contact Us' }}
                icon={<ChatBubbleOutline color={'primary'} sx={{ fontSize: 70 }} />}
                emailSupportTitle="General Questions"
                phoneSupportTitle="Emergency Support"
                contactEmail="something@email.com"
                contactPhone="1-800-123-4567"
                dismissButtonLabel="Okay"
                emailSupportContent={(contactEmail: string): JSX.Element => (
                    <Typography variant="body1">
                        {'For questions, feedback, or support please email us at '}
                        <Typography variant="button" component="a" href={`mailto:${contactEmail ?? ''}`}>
                            {contactEmail}
                        </Typography>
                        {`.`}
                    </Typography>
                )}
                phoneSupportContent={(phone: string): JSX.Element => (
                    <Typography variant="body1">
                        {'For technical support, please call '}
                        <Typography variant="button" component="a" href={`tel:${phone ?? ''}`}>
                            {phone}
                        </Typography>
                        {`.`}
                    </Typography>
                )}
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
            <ContactSupportScreenBase
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
