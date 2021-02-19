import { TFunction, withTranslation } from 'next-i18next';
import { useEffect } from 'react';

import ErrorBoundaryReloadingComponent from './error-boundary-reloading-component';

type ErrorBoundaryReloadingContainerProps = {
  onReset: () => void;
  t: TFunction;
};

function ErrorBoundaryReloadingContainer({
  onReset,
  ...props
}: ErrorBoundaryReloadingContainerProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onReset();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [onReset]);

  return <ErrorBoundaryReloadingComponent {...props} />;
}

export default withTranslation()(ErrorBoundaryReloadingContainer);
