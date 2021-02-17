import { axe } from 'jest-axe';
import { render, screen } from 'tests/test-helpers';

import LandingPageContainer from './landing-page-container';

describe('Landing page container', () => {
  it('renders a link to the project', async () => {
    const { container } = render(<LandingPageContainer />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();

    expect(
      screen.getByRole('link', { name: /janhesters.com/i }),
    ).toBeInTheDocument();
  });
});
