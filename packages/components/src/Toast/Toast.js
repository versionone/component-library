import PropTypes from 'prop-types';
import React from 'react';
import { lighten, toRgbaString } from '@andrew-codes/color-functions';
import { AlertIcon, CheckIcon, InfoIcon } from '@versionone/icons';
import { createComponent, StyleProvider } from '../StyleProvider';
import { SpacedGroup } from '../SpacedGroup';

const ToastImpl = createComponent(
  ({ variant, theme }) => {
    return {
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'space-between',
      'background-color': toRgbaString(lighten(theme.Toast[variant].main, 0.4)),
      'border-top-style': 'solid',
      'border-top-size': 2,
      'border-top-color': theme.Toast[variant].main,
      width: '100%',
      padding: 16,
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const Toast = props => {
  const Icon =
    props.variant === 'warning' || props.variant === 'error'
      ? AlertIcon
      : props.variant === 'success'
      ? CheckIcon
      : InfoIcon;

  return (
    <StyleProvider>
      <ToastImpl {...props} data-component="Toast">
        <SpacedGroup>
          <Icon />
          {props.message}
        </SpacedGroup>
        {props.action}
      </ToastImpl>
    </StyleProvider>
  );
};

Toast.propTypes = {
  /**
   * Variant of the toast
   */
  variant: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  /**
   * message to present
   */
  message: PropTypes.string.isRequired,
  /**
   * Action to resolve the toast
   */
  action: PropTypes.node,
};

Toast.defaultProps = {
  variant: 'info',
  action: null,
};

export { Toast };
