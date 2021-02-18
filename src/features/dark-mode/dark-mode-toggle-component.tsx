// NOTE: ToggleIcon are spans and accessible, ESLint is confused by styled
// components.
/* eslint-disable jsx-a11y/accessible-emoji */
import 'react-toggle/style.css';

import { TFunction } from 'next-i18next';
import Toggle from 'react-toggle';

import { ToggleIcon } from './dark-mode-toggle-component-styles';

type IconProps = {
  t: TFunction;
};

const Sun = ({ t }: IconProps) => (
  <ToggleIcon aria-label={t('dark-mode:sun')} role="img">
    ☀️
  </ToggleIcon>
);

const Moon = ({ t }: IconProps) => (
  <ToggleIcon aria-label={t('dark-mode:moon')} role="img">
    🌔
  </ToggleIcon>
);

type DarkModeToggleProps = {
  onThemeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  darkModeIsOn: boolean;
  t: TFunction;
};

const DarkModeToggleComponent = ({
  darkModeIsOn,
  onThemeChange,
  t,
}: DarkModeToggleProps) => (
  <Toggle
    aria-label={
      darkModeIsOn
        ? t('dark-mode:activate-light-mode')
        : t('dark-mode:activate-dark-mode')
    }
    checked={darkModeIsOn}
    icons={{ unchecked: <Sun t={t} />, checked: <Moon t={t} /> }}
    onChange={onThemeChange}
  />
);

export default DarkModeToggleComponent;
