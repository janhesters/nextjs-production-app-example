import { PropsWithChildren, useState } from 'react';

import ErrorBoundary, { ErrorBoundaryProps } from './error-boundary-container';
import ErrorBoundaryReloadingContainer from './error-boundary-reloading-container';

export type AutoRetryErrorBoundaryContainerProps = Omit<
  PropsWithChildren<ErrorBoundaryProps>,
  'renderFallback'
>;

function AutoRetryErrorBoundaryContainer(
  ownProps: AutoRetryErrorBoundaryContainerProps,
) {
  const [shouldAutoRetry, setShouldAutoRetry] = useState(true);

  const props: ErrorBoundaryProps = {
    ...(shouldAutoRetry && {
      renderFallback: onReset => (
        <ErrorBoundaryReloadingContainer
          onReset={() => {
            onReset();
            setShouldAutoRetry(false);
          }}
        />
      ),
    }),
    ...ownProps,
  };

  return <ErrorBoundary {...props} />;
}

export default AutoRetryErrorBoundaryContainer;
