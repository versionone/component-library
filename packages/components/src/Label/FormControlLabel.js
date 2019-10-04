import React from 'react';
import { PropTypes } from 'prop-types';
import { noop } from 'underscore';
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
    position: 'relative',
  }),
  'span',
  ['data-component', 'data-test'],
);

const FormControlLabel = props => {
  const { 
  control,
  disabled,
  label, 
  labelPlacement, 
  onClick,
  selectedValue,
  onChange,
  onFocus,
  onBlur,
  focused,
  name,
  index, } = props;
  const controlProps = {
    onClick,
    disabled,
    selectedValue,
    onChange,
    onFocus,
    onBlur,
    focused,
    name,
    index,
  };
  const Control = React.cloneElement(control, controlProps);
  const content = labelPlacement === ABOVE || labelPlacement === LEFT 
      ? <React.Fragment><LabelWrapper>{label}</LabelWrapper>{Control}</React.Fragment>
      : <React.Fragment>{Control}<LabelWrapper>{label}</LabelWrapper></React.Fragment>;
  const direction = (labelPlacement === ABOVE || labelPlacement === BELOW) ? "vertical" : "horizontal";
  return (
    <SpacedGroup {...props} direction={direction} is='label'>
        {content}
    </SpacedGroup>
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
  labelPlacement: PropTypes.oneOf([ABOVE, BELOW, LEFT, RIGHT]),
  /**
   * Set the direction elements should be rendered.
   */
  label: PropTypes.string.isRequired,
    /**
   * If the element is checked
   */
  selected: PropTypes.bool,
  /**
   *  Function called when clicked
   */
  onClick: PropTypes.func,
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
};

FormControlLabel.defaultProps = {
  labelPlacement: LEFT,
  selected: false,
  onClick: noop,
  xs: 4,
  disableGutter: false,
  disabled: false,
};
export { FormControlLabel };