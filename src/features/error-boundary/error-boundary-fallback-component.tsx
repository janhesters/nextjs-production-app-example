import { TFunction } from 'next-i18next';

import { Heading, Paragraph, Wrapper } from './error-boundary-styles';

type ErrorBoundaryFallbackComponentProps = {
  message?: string;
  t: TFunction;
};

const ErrorBoundaryFallbackComponent = ({
  message,
  t,
}: ErrorBoundaryFallbackComponentProps) => (
  <Wrapper
    aria-label={`${t('error-boundary:fallback-heading')} ${t(
      'error-boundary:fallback-page-refresh',
    )}`}
    aria-live="assertive"
    role="alert"
  >
    <Heading>{t('error-boundary:fallback-heading')}</Heading>
    <Paragraph>
      {message || t('error-boundary:fallback-page-refresh')}
    </Paragraph>
  </Wrapper>
);

export default ErrorBoundaryFallbackComponent;
