import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render, screen } from 'tests/test-helpers';

import ErrorBoundary from './error-boundary-container';

const Bomb = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return <div>This is fine.</div>;
  }
};

const Fallback = ({ onReset }: { onReset?: () => void }) => (
  <button onClick={onReset}>Reset</button>
);

function WithOnResetAndCustomFallback() {
  const [shouldThrow, setShouldThrow] = useState(false);

  return (
    <ErrorBoundary
      onReset={() => setShouldThrow(false)}
      renderFallback={onReset => <Fallback onReset={onReset} />}
    >
      <Bomb shouldThrow={shouldThrow} />
      <button onClick={() => setShouldThrow(true)}>Throw!</button>
    </ErrorBoundary>
  );
}

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.restoreAllMocks();
});

describe('ErrorBoundary container', () => {
  it('renders its children without adding UI', () => {
    const { container } = render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    );

    expect(container).toMatchSnapshot();
  });

  it('captures the error and the info and renders a default fallback', () => {
    const componentName = 'Bomb';
    const reportError = jest.fn();

    render(
      <ErrorBoundary componentName={componentName} reportError={reportError}>
        <Bomb shouldThrow={true} />
      </ErrorBoundary>,
    );

    // it shows an error UI when the reload failed
    expect(
      screen.getByRole('alert', { name: /please refresh/i }),
    ).toBeInTheDocument();

    // it reports the captured error
    expect(reportError).toHaveBeenCalledWith(
      expect.objectContaining({
        componentName,
        error: new Error('💣'),
        info: expect.any(Object),
      }),
    );
  });

  it('calls onReset and renders custom fallbacks', () => {
    render(<WithOnResetAndCustomFallback />);

    // initial state
    expect(screen.getByText(/fine/i)).toBeInTheDocument();

    // throw
    userEvent.click(screen.getByRole('button', { name: /throw/i }));

    // reset
    userEvent.click(screen.getByRole('button', { name: /reset/i }));

    // restored initial state
    expect(screen.getByText(/fine/i)).toBeInTheDocument();
  });
});
