import React from 'react';
import '@testing-library/jest-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { cleanup, render, screen } from '@testing-library/react';
import { WorkflowCard } from './WorkflowCard';
import { WorkflowCardActions } from './WorkflowCardActions';
import { WorkflowCardBody } from './WorkflowCardBody';
import { WorkflowCardHeader } from './WorkflowCardHeader';
import { WorkflowCardInstructions } from './WorkflowCardInstructions';
import { ErrorState } from './ErrorState';

afterEach(cleanup);

describe('WorkflowCard tests', () => {
    it('renders without crashing', () => {
        render(
            <WorkflowCard loading={false} backgroundImage="blue">
                Test
            </WorkflowCard>
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        const darkTheme = createTheme({ palette: { mode: 'dark' } });
        render(
            <ThemeProvider theme={darkTheme}>
                <WorkflowCard loading={false}>Test</WorkflowCard>
            </ThemeProvider>
        );
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});

describe('WorkflowCardActions tests', () => {
    it('renders without crashing', () => {
        render(
            <WorkflowCardActions
                canGoPrevious={(): any => {}}
                showPrevious={true}
                previousLabel={'Back'}
                onPrevious={(): void => {}}
                canGoNext={(): any => {}}
                showNext={true}
                nextLabel={'Next'}
                onNext={(): void => {}}
                currentStep={2}
                totalSteps={5}
                fullWidthButton={false}
            ></WorkflowCardActions>
        );
        expect(screen.getByTestId('BluiWorkflowCardActions-previousButton')).toHaveTextContent('Back');
    });

    it('renders without crashing', () => {
        render(
            <WorkflowCardActions
                canGoPrevious={false}
                showPrevious={false}
                previousLabel={'Back'}
                onPrevious={(): void => {}}
                canGoNext={true}
                showNext={true}
                nextLabel={'Next'}
                onNext={(): void => {}}
                currentStep={0}
                totalSteps={0}
                fullWidthButton={true}
            ></WorkflowCardActions>
        );
    });

    it('renders without crashing', () => {
        render(
            <WorkflowCardActions
                canGoPrevious={true}
                showPrevious={true}
                previousLabel={'Back'}
                onPrevious={(): void => {}}
                canGoNext={false}
                showNext={false}
                nextLabel={'Next'}
                onNext={(): void => {}}
                currentStep={0}
                totalSteps={0}
                fullWidthButton={true}
            ></WorkflowCardActions>
        );
    });

    it('renders without crashing', () => {
        render(
            <WorkflowCardActions
                canGoPrevious={true}
                showPrevious={true}
                previousLabel={'Back'}
                onPrevious={(): void => {}}
                canGoNext={false}
                showNext={false}
                nextLabel={'Next'}
                onNext={(): void => {}}
                fullWidthButton={false}
            ></WorkflowCardActions>
        );
    });
});

describe('WorkflowCardBody tests', () => {
    it('renders without crashing', () => {
        render(<WorkflowCardBody>Body</WorkflowCardBody>);
        expect(screen.getByText('Body')).toBeInTheDocument();
    });
});
describe('WorkflowCardHeader tests', () => {
    it('renders without crashing', () => {
        render(<WorkflowCardHeader title="Test" sx={{ color: 'red' }} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        render(<WorkflowCardHeader title={'Test'} sx={{ color: 'red' }} />);
    });
});

describe('WorkflowCardInstructions tests', () => {
    it('renders without crashing', () => {
        render(<WorkflowCardInstructions instructions="Test" divider={false} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        render(<WorkflowCardInstructions instructions="Test" divider={true} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });

    it('renders with divider', () => {
        const { container } = render(<WorkflowCardInstructions instructions="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(container.getElementsByClassName('MuiDivider-root').length).toBe(1);
    });

    it('renders without divider', () => {
        const { container } = render(<WorkflowCardInstructions instructions="Test" divider={false} />);
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(container.getElementsByClassName('MuiDivider-root').length).toBe(0);
    });
});

describe('ErrorState tests', () => {
    it('renders without crashing', () => {
        render(<ErrorState message="Test" />);
        expect(screen.getByText('Test')).toBeInTheDocument();
    });
});
