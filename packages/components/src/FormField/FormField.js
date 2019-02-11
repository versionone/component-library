import React from 'react';
import PropTypes from 'prop-types';
import { SpacedGroup } from '../SpacedGroup';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';
const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

const FormField = props => <SpacedGroup {...props} is="label" />;
FormField.propTypes = {
  /**
   * Set components to equally space.
   */
  children: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /*
   * Turn on vertical or horizontal centering of items
   */
  center: PropTypes.bool,
  /**
   * If true stretch to fill space
   */
  stretch: PropTypes.bool,
  /**
   * Set the amount to space to apply between elements when the screen is phone and up
   */
  xs: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet portrait and up
   */
  sm: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet landscape and up
   */
  md: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is small desktop and up
   */
  lg: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is large desktop and up
   */
  xl: PropTypes.oneOf(spacingUnits),
  /**
   * Removes the margin from the frist and last child
   */
  disableGutter: PropTypes.bool,
};

FormField.defaultProps = {
  direction: HORIZONTAL,
  xs: 4,
  center: false,
  stretch: false,
  disableGutter: false,
};
export default FormField;
