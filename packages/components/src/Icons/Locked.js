// This is a generated file; do not edit manually.
import React from 'react';
import PropTypes from 'prop-types';
import IconBase from './IconBase';

class LockedIcon extends IconBase {
  render() {
    return <IconBase iconId="locked" {...this.props} />;
  }
}
LockedIcon.propTypes = {
  /**
   * Color of the icon.
   */
  color: PropTypes.string,
  /**
   * Value of the width and height of the icon. Icons are always square.
   */
  size: PropTypes.number,
};
LockedIcon.defaultProps = {
  color: 'currentColor',
  size: 16,
};
export default LockedIcon;
