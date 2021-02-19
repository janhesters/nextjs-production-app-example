import SpinnerContainer from 'components/spinner/spinner-container';
import type { TFunction } from 'next-i18next';

import { Heading, Paragraph, Wrapper } from './error-boundary-styles';

type ErrorBoundaryReloadingComponentProps = {
  t: TFunction;
};

const ErrorBoundaryReloadingComponent = ({
  t,
}: ErrorBoundaryReloadingComponentProps) => (
  <Wrapper>
    <SpinnerContainer
      isAssertive
      label={`${t('error-boundary:fallback-heading')} ${t(
        'error-boundary:fallback-automatically-reloading',
      )}`}
    />
    <Heading>{t('error-boundary:fallback-heading')}</Heading>
    <Paragraph>
      {t('error-boundary:fallback-automatically-reloading')}
    </Paragraph>
  </Wrapper>
);

export default ErrorBoundaryReloadingComponent;
