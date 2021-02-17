import userEvent from '@testing-library/user-event';
import { render, screen } from 'tests/test-helpers';

import useToggleOutline from './use-toggle-outline';

function TestComponent() {
  // we use a <div /> instead of styles because that is easier to test
  const hideTestId = useToggleOutline();

  return (
    <main>
      {!hideTestId && <div data-testid="outline" />}
      <button>Click Me</button>
    </main>
  );
}

describe('use toggle outline hook', () => {
  it('hides hides outline after mouse click and show it after keyboard usage', () => {
    render(<TestComponent />);

    // by default outline is hidden
    expect(screen.queryByTestId('outline')).not.toBeInTheDocument();

    userEvent.tab();

    // using the keyboard shows the outline
    expect(screen.getByRole('button')).toHaveFocus();
    expect(screen.getByTestId('outline')).toBeInTheDocument();

    userEvent.click(screen.getByText('Click Me'));

    // using the mouse hides the outline
    expect(screen.queryByTestId('outline')).not.toBeInTheDocument();
  });
});
