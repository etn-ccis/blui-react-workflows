import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@testing-library/jest-dom';
import { cleanup, render, screen, fireEvent, getByText } from '@testing-library/react';
import userEvent from "@testing-library/user-event"
import * as BLUIThemes from '@brightlayer-ui/react-themes';
import { VerifyCodeScreenBase } from './VerifyCodeScreenBase';

const theme = createTheme(BLUIThemes.blue);
afterEach(cleanup);

describe('Verify code screen title & instructions', () => {
    it('renders without crashing', () => {
        render(
            <VerifyCodeScreenBase
                title={'Verify Email'}
                instructions='Verification code instructions'
            >
            </VerifyCodeScreenBase>
        );
        expect(screen.getByText('Verify Email')).toBeInTheDocument();
        expect(screen.getByText('Verification code instructions')).toBeInTheDocument();
    });
});

describe('Verify code screen error', () => {
    it('renders without crashing', async () => {
        const user = userEvent.setup()
        render(
            <VerifyCodeScreenBase
            title={'Verify Email'}
            codeValidator={(code: string): boolean | string => {
                if (code?.length > 2) {
                    return true;
                }
                return 'Code must be at least 3 characters';
            }}
                initialValue={'1'}
            >
            </VerifyCodeScreenBase>
        );
        // await user.click(screen.getByRole('input', {textbox: /1!/i}))
        await user.click(screen.getByText('Verify Email'))
        expect(screen.getByDisplayValue('Code must be at least 3 characters')).toBeInTheDocument();
        // expect(screen.getByDisplayValue('You must provide a valid code')).toBeInTheDocument();
        // expect(screen.getByText('You must provide a valid code').focus());
    });
});

describe('Verify code screen all props', () => {
    it('renders without crashing', () => {
        render(
            <VerifyCodeScreenBase
                title={'Verify Email'}
                instructions='Verification code instructions'
                initialValue={'123'}
                verifyCodeInputLabel={'Verification code input label'}
                resendLabel="Send Again"
                resendInstructions={"Didn't receive email?"}
                showNext={true}
                nextLabel="Next"
                canGoNext={true}
                showPrevious={true}
                previousLabel="Back"
                canGoPrevious={true}
                currentStep={2}
                totalSteps={6}
            >
            </VerifyCodeScreenBase>
        );
        expect(screen.getByText('Verify Email')).toBeInTheDocument();
        expect(screen.getByText('Verification code instructions')).toBeInTheDocument();
        expect(screen.getByDisplayValue('123')).toBeInTheDocument();
        expect(screen.getByText('Verification code input label')).toBeInTheDocument();
        expect(screen.getByText('Send Again')).toBeInTheDocument();
        expect(screen.getByText('Didn\'t receive email?')).toBeInTheDocument();
        expect(screen.getByText('Next')).toBeInTheDocument();
        expect(screen.getByText('Back')).toBeInTheDocument();
    });
});