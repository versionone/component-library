import React from 'react';
import PropTypes from 'prop-types';
import { BrokenImageIcon } from '@versionone/icons';

export const BrokenImageAvatar = ({ size }) => (
  <BrokenImageIcon size={size / 2} />
);

BrokenImageAvatar.propTypes = {
  /**
   * Size of icon
   */
  size: PropTypes.number,
};

BrokenImageAvatar.defaultProps = {
  size: 24,
};
