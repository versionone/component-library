import React, { Component } from 'react';
import PropTypes from 'prop-types';

class IconBase extends Component {
  render() {
    const { iconId, color, size, ...rest } = this.props;
    return (
      <span
        style={{
          display: 'inline-flex',
        }}
        {...rest}
      >
        <svg
          style={{
            fill: color,
            height: size + 'px',
            width: size + 'px',
          }}
        >
          <use xlinkHref={`#${iconId}`} />
        </svg>
      </span>
    );
  }
}
IconBase.propTypes = {
  iconId: PropTypes.string.isRequired,
};
export default IconBase;
