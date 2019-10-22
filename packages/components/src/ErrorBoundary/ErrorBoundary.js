import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';

const DefaultFallback = ({ error, info }) => {
  return (
    <div>
      {error}
      {info}
    </div>
  );
};

class ErrorBoundary extends React.Component {
  constructor(props, ...rest) {
    super(props, ...rest);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    debugger;
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;
    debugger;
    onError('walker', error, info);
  }

  render() {
    const { hasError, error } = this.state;
    const { Fallback, children } = this.props;
    if (hasError) {
      return <Fallback error={error} />;
    }
    return children;
  }
}

ErrorBoundary.propTypes = {
  /**
   * User interface to render when no errors have been caught
   */
  children: PropTypes.func,
  /**
   * User interface to present when an unexpected error has occured
   */
  Fallback: PropTypes.node,
  /**
   * Logging mechanism to use when an error is caught
   */
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  Fallback: DefaultFallback,
  onError: noop,
};

export { ErrorBoundary };
