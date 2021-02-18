import { TFunction, withTranslation } from 'next-i18next';
import useDarkMode from 'use-dark-mode';

import DarkModeToggleComponent from './dark-mode-toggle-component';

type DarkModeContainerProps = {
  t: TFunction;
};

function DarkModeToggleContainer(ownProps: DarkModeContainerProps) {
  const { toggle, value } = useDarkMode(false);

  const props = {
    darkModeIsOn: value,
    onThemeChange: toggle,
    ...ownProps,
  };

  return <DarkModeToggleComponent {...props} />;
}

export default withTranslation()(DarkModeToggleContainer);
