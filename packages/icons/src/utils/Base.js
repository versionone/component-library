import React from 'react';
import PropTypes from 'prop-types';

const Base = ({ color, icon: Icon, size, title, ...rest }) => (
  <Icon
    style={{
      display: 'inline-flex',
      fill: color,
      height: `${size}px`,
      width: `${size}px`,
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
};
Base.defaultProps = {
  color: '#000',
  size: 24,
};
export { Base };
