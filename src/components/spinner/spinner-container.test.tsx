import { axe } from 'jest-axe';
import { render, screen } from 'tests/test-helpers';
import type { Factory } from 'utils/types';

import { SpinnerProps } from './spinner-component';
import SpinnerContainer from './spinner-container';

const createProps: Factory<SpinnerProps> = ({
  label = 'Loading ...',
  ...props
} = {}) => ({
  label,
  ...props,
});

describe('Spinner container', () => {
  it('is accessible, can be hidden, and has the correct roles', async () => {
    const { label } = createProps();
    const { container, rerender } = render(
      <SpinnerContainer {...createProps()} />,
    );

    // the component is accessible
    const results = await axe(container);
    expect(results).toHaveNoViolations();

    // has a role of 'status' by default and has the correct label
    expect(screen.getByRole('status', { name: label })).toBeInTheDocument();

    rerender(<SpinnerContainer {...createProps({ isShowing: false })} />);

    // hidden spinner does NOT render
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    rerender(<SpinnerContainer {...createProps({ isAssertive: true })} />);

    // assertive spinner has a role of 'alert' and keeps the correct label
    expect(screen.getByRole('alert', { name: label })).toBeInTheDocument();
  });
});
