import React from 'react';
import PropTypes from 'prop-types';
import { WithTheme } from '../StyleProvider';

export const IconAvatar = ({ icon, size, color }) => {
  return (
    <WithTheme>
      {theme => {
        return React.cloneElement(icon, {
          size: (size * 1.2) / 3,
          color: color || theme.Icon.main,
        });
      }}
    </WithTheme>
  );
};

IconAvatar.propTypes = {
  /**
   * Icon to render
   */
  icon: PropTypes.shape({
    color: PropTypes.string,
    size: PropTypes.number,
    title: PropTypes.string,
    rotate: PropTypes.number,
  }).isRequired,
  /**
   * Size of the icon
   */
  size: PropTypes.number,
  /**
   * Icon color
   */
  color: PropTypes.string,
};

IconAvatar.defaultProps = {
  size: 24,
  color: null,
};
