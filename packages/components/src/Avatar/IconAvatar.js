import React from 'react';
import PropTypes from 'prop-types';
import { WithTheme } from '../StyleProvider';

export const IconAvatar = ({ icon, size }) => {
  return (
    <WithTheme>
      {theme => {
        return React.cloneElement(icon, {
          size: (size * 1.2) / 3,
          color: theme.Icon.main,
        });
      }}
    </WithTheme>
  );
};

IconAvatar.propTypes = {
  /**
   * Icon to render
   */
  icon: PropTypes.string.isRequired,
  /**
   * Size of the icon
   */
  size: PropTypes.number,
};

IconAvatar.defaultProps = {
  size: 24,
};
