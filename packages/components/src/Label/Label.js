import React from 'react';
import { PropTypes } from 'prop-types';
import { createComponent } from '../StyleProvider';
import { SpacedGroup } from '../SpacedGroup';

const ABOVE = 'above';
const BELOW = 'below';
const RIGHT = 'right';
const LEFT = 'left';
const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

const LabelText = createComponent(
  ({ disabled, theme }) => ({
    color: disabled ? theme.Label.disabled.main : theme.Label.default.main,
    opacity: disabled && .5,
    cursor: disabled && 'not-allowed',
    textTransform: 'uppercase',
  }),
  'label',
  ['data-component', 'data-test'],
);

const RequiredText = createComponent(
  ({ theme }) => ({
    color: theme.Label.required.main,
  }),
  'span',
);

const Label = props => {
  const { children, disabled, required, 'data-test': dataTest, labelText, location } = props;
  const requiredText = <RequiredText>*</RequiredText>;
  const isBefore = location === (ABOVE || LEFT);
  const direction = location === (ABOVE || BELOW) ? "verical" : "horizontal";
  return (
    <SpacedGroup {...props} direction={direction} is="label">
      <LabelText data-component="Label" data-test={dataTest} disabled={disabled}>
        {isBefore && label}{children}{!isBefore && label}
      </LabelText>
    </SpacedGroup>
  );
};

Label.propTypes = {
  /**
   * Set components to equally space.
   */
  children: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  location: PropTypes.oneOf([ABOVE, BELOW, LEFT, RIGHT]),
  /**
   * Set the direction elements should be rendered.
   */
  labelText: PropTypes.string,
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
    /**
   * Indicates a disabled field
   */
  disabled: PropTypes.bool,
  /**
   * Indicates a required field
   *  */
  required: PropTypes.bool,
};

Label.defaultProps = {
  location: LEFT,
  labelText: "",
  xs: 4,
  center: false,
  stretch: false,
  disableGutter: false,
  disabled: false,
  required: false,
};
export { Label };