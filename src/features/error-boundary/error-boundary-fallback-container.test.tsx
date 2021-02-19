import { render, screen } from 'tests/test-helpers';

import ErrorBoundaryFallback from './error-boundary-fallback-container';

describe('ErrorBoundaryFallback container', () => {
  it('renders a default message', () => {
    render(<ErrorBoundaryFallback />);

    expect(
      screen.getByText('An error occurred. Please refresh the page.'),
    ).toBeInTheDocument();
  });

  it('given a message: renders the message', () => {
    const message = 'My custom message.';
    render(<ErrorBoundaryFallback message={message} />);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
