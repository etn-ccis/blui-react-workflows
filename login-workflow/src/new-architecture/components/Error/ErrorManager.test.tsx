import React from 'react';
import '@testing-library/jest-dom';
import { render, cleanup, screen } from '@testing-library/react';
import ErrorManager from './ErrorManager';

afterEach(cleanup);

describe('ErrorManager', () => {
    it('renders without crashing', () => {
        render(<ErrorManager error={'Error Message'} dialogConfig={{ title: 'Error Title' }} />);
        const errorManager = screen.getByText('Error Message');
        expect(errorManager).toBeInTheDocument();
    });
});
