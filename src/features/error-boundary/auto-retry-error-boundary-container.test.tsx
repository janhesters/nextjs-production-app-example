import { render, screen } from 'tests/test-helpers';

import AutoRetryErrorBoundary from './auto-retry-error-boundary-container';

const Bomb = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error('💣');
  } else {
    return <div>This is fine.</div>;
  }
};

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.resetAllMocks();
});

afterAll(() => {
  jest.clearAllTimers();
  jest.restoreAllMocks();
});

describe('AutoRetryErrorBoundary container', () => {
  it('renders its children without adding UI', () => {
    const { container } = render(
      <AutoRetryErrorBoundary>
        <Bomb />
      </AutoRetryErrorBoundary>,
    );

    expect(container).toMatchSnapshot();
  });

  it('captures the error and the info and renders a default fallback and attempts to manually reload once when an error occurred', async () => {
    const componentName = 'Bomb';
    const reportError = jest.fn();

    render(
      <AutoRetryErrorBoundary
        componentName={componentName}
        reportError={reportError}
      >
        <Bomb shouldThrow={true} />
      </AutoRetryErrorBoundary>,
    );

    // it attempts an automatic reload
    expect(
      screen.getByRole('alert', { name: /reloading/i }),
    ).toBeInTheDocument();

    jest.advanceTimersByTime(1000);

    // it shows an error UI when the reload failed
    expect(
      await screen.findByRole('alert', { name: /please refresh/i }),
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
});
