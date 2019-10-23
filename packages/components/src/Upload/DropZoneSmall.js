import React from 'react';
import PropTypes from 'prop-types';
import { UploadIcon } from '@versionone/icons';
import { InputFieldContainer } from './InputFieldContainer';

export const DropZoneSmall = ({
  children,
  disabled,
  focused,
  color,
  iconColor,
}) => {
  return (
    <InputFieldContainer disabled={disabled} focused={focused} color={color}>
      <UploadIcon size={32} title="upload" color={iconColor} />
      <span>Upload</span>
      {children}
    </InputFieldContainer>
  );
};

DropZoneSmall.propTypes = {
  /**
   * Hidden field
   */
  children: PropTypes.node.isRequired,
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

DropZoneSmall.defaultProps = {
  disabled: false,
  focused: false,
};
