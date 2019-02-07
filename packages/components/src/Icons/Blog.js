// This is a generated file; do not edit manually.
import React from 'react';
import PropTypes from 'prop-types';
import IconBase from './IconBase';

class BlogIcon extends IconBase {
  render() {
    return <IconBase iconId="blog" {...this.props} />;
  }
}
BlogIcon.propTypes = {
  /**
   * Color of the icon.
   */
  color: PropTypes.string,
  /**
   * Value of the width and height of the icon. Icons are always square.
   */
  size: PropTypes.number,
};
BlogIcon.defaultProps = {
  color: 'currentColor',
  size: 16,
};
export default BlogIcon;
