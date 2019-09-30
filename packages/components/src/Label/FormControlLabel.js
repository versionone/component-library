import React from 'react';
import { PropTypes } from 'prop-types';
import { createComponent } from '../StyleProvider';
import { SpacedGroup } from '../SpacedGroup';

const ABOVE = 'above';
const BELOW = 'below';
const RIGHT = 'right';
const LEFT = 'left';
const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

const LabelWrapper = createComponent(
  ({ disabled, theme }) => ({
    color: disabled ? theme.Label.disabled.main : theme.Label.default.main,
    opacity: disabled && .5,
    cursor: disabled && 'not-allowed',
    display: 'flex',
    alignItems: 'center',
  }),
  'div',
  ['data-component', 'data-test'],
);

const FormControlLabel = props => {
  const { control, checked, disabled, 'data-test': dataTest, labelText, location } = props;
  const controlProps = {
    selected: checked,
  };
  const Control = React.cloneElement(control, controlProps);
  const content = location === ABOVE || location === LEFT 
      ? <React.Fragment>{labelText}<Control /></React.Fragment> 
      : <React.Fragment><Control />{labelText}</React.Fragment>;
  const direction = (location === ABOVE || location === BELOW) ? "vertical" : "horizontal";
  return (
    <LabelWrapper data-component="Label" data-test={dataTest} disabled={disabled}>
      <SpacedGroup {...props} direction={direction} is="label">
        {content}
      </SpacedGroup>
    </LabelWrapper>
  );
};

FormControlLabel.propTypes = {
  /**
   * Set components to equally space.
   */
  control: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  location: PropTypes.oneOf([ABOVE, BELOW, LEFT, RIGHT]),
  /**
   * Set the direction elements should be rendered.
   */
  labelText: PropTypes.string.isRequired,
    /**
   * If the element is checked
   */
  checked: PropTypes.string.isRequired,
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

FormControlLabel.defaultProps = {
  location: LEFT,
  xs: 4,
  disableGutter: false,
  disabled: false,
  required: false,
};
export { FormControlLabel };