import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import ErrorMessageBox from './ErrorMessageBox';

afterEach(cleanup);

describe('ErrorMessageBox', () => {
    it('renders without crashing', () => {
        render(<ErrorMessageBox errorMessage="Error Message" />);
        const messageBox = screen.getByText('Error Message');
        expect(messageBox).toBeInTheDocument();
    });
});
