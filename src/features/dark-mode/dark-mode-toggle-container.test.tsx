import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen } from 'tests/test-helpers';

import DarkModeToggleContainer from './dark-mode-toggle-container';

describe('DarkModeToggle container', () => {
  it('renders a toggle and clicking it changes the dark mode', async () => {
    const { container } = render(<DarkModeToggleContainer />);

    // the component is accessible
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    // Toggle dark mode on
    const moon = screen.getByRole('checkbox', { name: /activate dark mode/i });
    expect(moon).not.toBeChecked();
    expect(document.body).toHaveClass('light-mode');
    userEvent.click(moon);

    // Toggle dark mode off
    const sun = screen.getByRole('checkbox', { name: /activate light mode/i });
    expect(sun).toBeChecked();
    expect(document.body).toHaveClass('dark-mode');
    userEvent.click(sun);
  });
});
