import React from 'react';
import PropTypes from 'prop-types';

const Base = ({ color = '#000', icon: Icon, size, ...rest }) => (
  <Icon
    style={{
      display: 'inline-flex',
      fill: color,
      height: `${size}px`,
      width: `${size}px`,
    }}
    {...rest}
  />
);
Base.propTypes = {
  size: PropTypes.number,
  title: PropTypes.string.isRequired,
};
Base.defaultProps = {
  size: 24,
};
export default Base;
