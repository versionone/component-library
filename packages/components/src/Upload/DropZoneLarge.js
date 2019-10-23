import React from 'react';
import PropTypes from 'prop-types';
import { UploadIcon } from '@versionone/icons';
import { InputFieldContainer } from './InputFieldContainer';

export const DropZoneLarge = ({
  primaryText,
  secondaryText,
  children,
  disabled,
  focused,
  color,
  iconColor,
}) => {
  return (
    <InputFieldContainer disabled={disabled} focused={focused} color={color}>
      <UploadIcon size={32} title="upload" color={iconColor} />
      <span>{primaryText}</span>
      <span>{secondaryText}</span>
      {children}
    </InputFieldContainer>
  );
};

DropZoneLarge.propTypes = {
  /**
   * hidden field
   */
  children: PropTypes.node.isRequired,
  /**
   * primary text to display
   */
  primaryText: PropTypes.string.isRequired,
  /**
   * secondary text to re-enforce the primary text's message
   */
  secondaryText: PropTypes.string.isRequired,
  /**
   * If `true` then user interaction is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If `true` then field is focused
   */
  focused: PropTypes.bool,
  /**
   * Color
   */
  color: PropTypes.string,
  /**
   * Icon color
   */
  iconColor: PropTypes.string,
};

DropZoneLarge.defaultProps = {
  disabled: false,
  focused: false,
};
