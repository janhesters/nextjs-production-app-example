import { Root } from './spinner-component-styles';

export type SpinnerProps = {
  isAssertive?: boolean;
  isShowing?: boolean;
  label: string;
  small?: boolean;
} & React.ComponentPropsWithoutRef<'div'>;

const getLive = (isAssertive: boolean) =>
  isAssertive ? 'assertive' : 'polite';
const getRole = (isAssertive: boolean) => (isAssertive ? 'alert' : 'status');

const SpinnerComponent = ({
  isAssertive = false,
  isShowing = true,
  small = false,
  label,
  ...props
}: SpinnerProps) => (
  <div aria-live={getLive(isAssertive)} {...props}>
    {isShowing && (
      <Root aria-label={label} small={small} role={getRole(isAssertive)} />
    )}
  </div>
);

export default SpinnerComponent;
