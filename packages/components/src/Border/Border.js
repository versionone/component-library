import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const BorderImpl = createComponent(
  ({ color, width, borderStyle, radius }) => ({
    borderStyle,
    borderWidth: width,
    borderColor: color,
    ...styleUtils.conditionalStyle(radius !== null, 'border-radius', radius),
  }),
  'div',
  ['data-component', 'data-test'],
);

const Border = ({ color, disabled, style, ...otherProps }) => (
  <StyleProvider>
    <BorderImpl
      borderStyle={style}
      color={disabled ? 'transparent' : color}
      data-component="Border"
      {...otherProps}
    />
  </StyleProvider>
);

Border.propTypes = {
  /**
   *
   * If true the border is not applied
   */
  disabled: PropTypes.bool,
  /**
   * Color of the border
   */
  color: PropTypes.string,
  /**
   * Width of the border
   */
  width: PropTypes.number,
  /**
   * style of the border
   */
  style: PropTypes.string,
  /**
   * border radius applied
   */
  radius: PropTypes.number,
};

Border.defaultProps = {
  disabled: false,
  color: palette.dove,
  width: 1,
  style: 'solid',
  radius: null,
};

export { Border };
