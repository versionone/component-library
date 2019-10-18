import PropTypes from 'prop-types';
import React from 'react';
import { lighten, toRgbaString } from '@andrew-codes/color-functions';
import { AlertIcon, CheckIcon, InfoIcon } from '@versionone/icons';
import { createComponent } from '../StyleProvider';
import { SpacedGroup } from '../SpacedGroup';
import { Typography } from '../Typography';

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

const iconByVariant = {
  warning: AlertIcon,
  error: AlertIcon,
  success: CheckIcon,
};

const Toast = ({ variant, message, action, 'data-test': dataTest }) => {
  const Icon = iconByVariant[variant] || InfoIcon;

  return (
    <ToastImpl variant={variant} data-test={dataTest} data-component="Toast">
      <SpacedGroup>
        <Icon />
        <Typography variant="large">{message}</Typography>
      </SpacedGroup>
      {action}
    </ToastImpl>
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
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

Toast.defaultProps = {
  variant: 'info',
  action: null,
};

export { Toast };
