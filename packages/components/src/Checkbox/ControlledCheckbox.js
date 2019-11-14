import { CheckIcon } from '@versionone/icons';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { createComponent, WithTheme } from '../StyleProvider';

const InvisibleInput = createComponent(
  () => ({
    position: 'absolute',
    opacity: 0,
  }),
  'input',
  [
    'data-component',
    'data-test',
    'data-trackingid',
    'onClick',
    'type',
    'id',
    'onChange',
    'checked',
    'name',
  ],
);

const CheckboxImpl = createComponent(({ size, disabled, color }) => {
  return {
    width: size,
    height: size,
    borderRadius: '3px',
    border: '2px solid transparent',
    borderColor: color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };
}, 'span');

const ControlledCheckbox = (props) => {
  const {
    size,
    id,
    onChange,
    disabled,
    'data-trackingid': trackingId,
    checked,
    ...rest
  } = props;
  return <WithTheme>
    {theme => {
      const color = theme.Checkbox.main;

      return (
        <Fragment>
          <InvisibleInput
            {...rest}
            onChange={onChange}
            type="checkbox"
            size={size}
            checked={checked}
            id={id}
            data-trackingid={trackingId}
          />
          <CheckboxImpl color={color} disabled={disabled} size={size}>
            {React.cloneElement(<CheckIcon/>, {
              size,
              color: checked ? color : 'transparent',
              display: 'inline-block',
              position: 'absolute',
              top: 4,
            })}
          </CheckboxImpl>
        </Fragment>
      );
    }}
  </WithTheme>;
};

ControlledCheckbox.propTypes = {
  /**
   * If true the checkbox is checked
   */
  checked: PropTypes.bool,
  /**
   * Disables the control
   */
  disabled: PropTypes.bool,
  /**
   * Function run when the checkbox is clicked
   */
  onChange: PropTypes.func,
  /**
   * The size of the checkbox
   */
  size: PropTypes.number,
  /**
   * Tab index of the switch
   */
  tabIndex: PropTypes.string,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
  /**
   * Identifier to associate label with control
   *  */
  id: PropTypes.string,
};

ControlledCheckbox.defaultProps = {
  checked: false,
  disabled: false,
  onClick: noop,
  size: 16,
  tabIndex: '0',
  onFocus: noop,
  onBlur: noop,
};

export { ControlledCheckbox };
