import React from 'react';
import PropTypes from 'prop-types';
import FocusLock from 'react-focus-lock';

const FocusLockImpl = props => {
  return (
    <FocusLock
      autoFocus={false}
      disabled={props.disabled}
      as={props.is}
      lockProps={{
        'data-component': 'FocusLock',
        'data-test': props['data-test'],
        style: { width: '100%' },
      }}
    >
      {props.children}
    </FocusLock>
  );
};

FocusLockImpl.propTypes = {
  /**
   * disable the focus lock without altering the DOM tree
   */
  disabled: PropTypes.bool,
  /**
   * Underlying component
   */
  is: PropTypes.string,
};

FocusLockImpl.defaultProps = {
  disabled: false,
  is: 'div',
};

export default FocusLockImpl;
