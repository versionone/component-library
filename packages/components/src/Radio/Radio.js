import PropTypes from 'prop-types';
import React, { Component, Fragment } from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';

const InvisibleInput = createComponent(
  () => ({
    height: 0,
    width: 0,
    opacity: 0,
    alignItems: 'center',
    position: 'relative',
    outline: 'none',
    margin: '4px',
    textTransform: 'none',
  }),
  'input',
  [
    'checked',
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

const Circle = createComponent(
  ({ checked, disabled, size, theme }) => {
    const innerCircle = {
      ':before': {
        content: '""',
        width: size / 2,
        height: size / 2,
        borderRadius: '50%',
        backgroundColor: checked ? theme.Radio.selected : 'transparent',
        position: 'absolute',
        display: 'block',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };
    return {
      position: 'relative',
      cursor: disabled ? 'not-allowed' : 'pointer',
      color: theme.Button.standard.text,
      height: size,
      width: size,
      minWidth: size,
      minHeight: size,
      borderRadius: '50%',
      border: '1px solid',
      borderColor: checked ? theme.Radio.selected : theme.Radio.main,
      backgroundColor: 'transparent',
      ...innerCircle,
    };
  },
  'span',
  ['onClick'],
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
      <Fragment>
        <InvisibleInput
          {...rest}
          data-component="Radio"
          disabled={disabled}
          checked={isSelected}
          aria-selected={isSelected}
          size={size}
          tabIndex={isSelected ? '0' : '-1'}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
          onClick={onClick(index, value)}
          focused={focused}
          type="radio"
          name={name}
          value={value}
        />
        <Circle disabled={disabled} checked={isSelected} size={size} />
      </Fragment>
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
  size: 24,
  tabIndex: '0',
};

export { Radio };
