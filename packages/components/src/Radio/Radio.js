import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import { createComponent, WithTheme } from '../StyleProvider';

const RadioImpl = createComponent(
  ({ disabled, checked, size, theme }) => ({
    height: size,
    width: size,
    alignItems: 'center',
    position: 'relative',
    outline: 'none',
    margin: '4px',
    textTransform: 'none',
    ':before': {
      content:'""',
      color: theme.Button.standard.text,
      height: size,
      width: size,
      minWidth: size,
      minHeight: size,
      borderRadius: '50%',
      border: '3px solid transparent',
      borderColor: checked ? theme.Radio.selected : theme.Radio.main,
      backgroundColor: theme.Radio.background,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    ':after': {
      content:'""',
      width: size/2,
      height: size/2,
      borderRadius: '50%',
      backgroundColor: checked ? theme.Radio.selected : 'transparent', 
      position: 'absolute',
      display: 'block',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
  'input',
  [
    'disabled',
    'onClick',
    'onChange',
    'tabIndex',
    'type',
    'name',
    'id',
    'value',
    'data-component',
  ],
);

class Radio extends Component {
  handleKeyPress(event) {
    const { onClick } = this.props;
    if (event.which === 13) {
      onClick(event);
    }
  }

  render() {
    const {
      disabled,
      selectedValue,
      onClick,
      onChange,
      onFocus,
      onBlur,
      focused,
      name,
      index,
      size,
      value,
      ...rest
    } = this.props;

    const isSelected = selectedValue === value;

    return (
        <RadioImpl
          {...rest}
          data-component="Radio"
          disabled={disabled}
          checked={isSelected}
          aria-selected={isSelected}
          size={size}
          tabIndex={isSelected ? '0' : '-1'}
          onClick={onClick(index, value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          focused={focused}
          type="radio"
          name={name}
          value={value}
        / >
    );
  }
}

Radio.propTypes = {
  /**
   * When true, does not respond to click events.
   */
  disabled: PropTypes.bool,
  /**
   * Size of the button
   */
  size: PropTypes.number,
  /**
   *  Function called when a radio is clicked
   */
  onClick: PropTypes.func,
  /**
   * Sets the tabindex of the button; used for tab order.
   */
  tabIndex: PropTypes.string,
      /**
   * Value of the radio
   *  */
  value: PropTypes.string.isRequired,
};

Radio.defaultProps = {
  disabled: false,
  onClick: noop,
  size: 32,
  tabIndex: '0',
};

export { Radio };
