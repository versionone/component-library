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
    opacity: disabled && 0.5,
    cursor: disabled && 'not-allowed',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
  }),
  'span',
  ['data-component'],
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
    id,
    index,
  } = props;
  const controlProps = {
    onClick,
    disabled,
    selectedValue,
    name,
    id,
    onChange,
    onFocus,
    onBlur,
    focused,
    index,
  };
  const newControl = React.cloneElement(control, controlProps);
  const content =
    labelPlacement === ABOVE || labelPlacement === LEFT ? (
      <React.Fragment>
        <LabelWrapper>{label}</LabelWrapper>
        {newControl}
      </React.Fragment>
    ) : (
      <React.Fragment>
        {newControl}
        <LabelWrapper>{label}</LabelWrapper>
      </React.Fragment>
    );
  const direction =
    labelPlacement === ABOVE || labelPlacement === BELOW
      ? 'vertical'
      : 'horizontal';
  return (
    <SpacedGroup {...props} direction={direction} is="label" htmlFor={id}>
      {content}
    </SpacedGroup>
  );
};

FormControlLabel.propTypes = {
  /**
   * Optional name attribute
   */
  name: PropTypes.string,
  /**
   * Reserved for RadioGroups
   */
  selectedValue: PropTypes.string,
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
   * Value to associate label with input
   */
  id: PropTypes.string,
  /**
   *  Function called when clicked
   */
  onClick: PropTypes.func,
  /**
   *  Function called when changed
   */
  onChange: PropTypes.func,
  /**
   *  Function called when focused
   */
  onFocus: PropTypes.func,
  /**
   *  Function called when blured
   */
  onBlur: PropTypes.func,
  /**
   * If it is focused
   */
  focused: PropTypes.bool,
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
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
};

FormControlLabel.defaultProps = {
  labelPlacement: LEFT,
  id: null,
  onClick: noop,
  xs: 4,
  disableGutter: false,
  disabled: false,
};
export { FormControlLabel };
