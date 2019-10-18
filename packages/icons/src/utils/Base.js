import React from 'react';
import PropTypes from 'prop-types';

const Base = ({ color, icon: Icon, size, title, rotate, ...rest }) => (
  <Icon
    style={{
      display: 'inline-flex',
      fill: color,
      height: `${size}px`,
      width: `${size}px`,
      transform: rotate !== null ? `rotate(${rotate}deg)` : '',
    }}
    title={title == null ? Icon.displayName : title}
    {...rest}
    data-component="Icon"
  />
);
Base.propTypes = {
  /** Color of icon. */
  color: PropTypes.string,
  /** Size dimensions of icon. */
  size: PropTypes.number,
  /** Title of icon. */
  title: PropTypes.string,
  /**
   * Number of degrees to rotate the icon
   */
  rotate: PropTypes.number,
};
Base.defaultProps = {
  color: '#000',
  size: 24,
};
export { Base };
