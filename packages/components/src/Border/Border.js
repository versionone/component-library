import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const BorderImpl = createComponent(
  ({ borderColor, borderStyle, radius, width }) => ({
    borderStyle,
    borderWidth: width,
    borderColor,
    ...styleUtils.conditionalStyle(radius !== null, 'borderRadius', radius),
  }),
  'div',
  ['data-component', 'data-test'],
);

const Border = ({ color, disabled, lineStyle, ...otherProps }) => {
  return (
    <BorderImpl
      borderStyle={lineStyle}
      borderColor={disabled ? 'transparent' : color}
      data-component="Border"
      {...otherProps}
    />
  );
};

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
   * Style of the border
   */
  lineStyle: PropTypes.string,
  /**
   * border radius applied
   */
  radius: PropTypes.number,
};

Border.defaultProps = {
  disabled: false,
  color: palette.dove,
  width: 1,
  lineStyle: 'solid',
  radius: null,
};

export { Border };
