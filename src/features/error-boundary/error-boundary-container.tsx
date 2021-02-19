import { Component, ErrorInfo } from 'react';

import ErrorBoundaryFallbackContainer from './error-boundary-fallback-container';

export type ErrorBoundaryProps = {
  componentName?: string;
  onReset?: () => void;
  renderFallback?: ((onReset: () => void) => JSX.Element) | (() => JSX.Element);
  reportError?: (details: {
    error: Error | null;
    info: ErrorInfo;
    componentName?: string;
  }) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error | null, info: ErrorInfo) {
    const { reportError, componentName } = this.props;

    if (reportError) {
      reportError({ error, info, componentName });
    }
  }

  handleReset = () => {
    this.props.onReset && this.props.onReset();
    this.setState({ hasError: false });
  };

  render() {
    const { hasError } = this.state;
    const {
      children,
      renderFallback = () => <ErrorBoundaryFallbackContainer />,
    } = this.props;

    return hasError ? renderFallback(this.handleReset) : children;
  }
}

export default ErrorBoundary;
