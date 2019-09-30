import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import { createComponent, WithTheme } from '../StyleProvider';
import { auto } from 'eol';

const RadioImpl = createComponent(
  ({ disabled, selected, size, theme }) => ({
    alignItems: 'center',
    color: theme.Button.standard.text,
    height: size,
    width: size,
    minWidth: size,
    minHeight: size,
    borderRadius: '50%',
    border: '3px solid',
    borderColor: selected ? theme.Radio.selected : theme.Radio.main,
    backgroundColor: 'transparent',
    position: 'relative',
    outline: 0,
    margin: '4px',
    ':before': {
      content:'""',
      width: size/2,
      height: size/2,
      borderRadius: '50%',
      backgroundColor: selected ? theme.Radio.selected : 'transparent', 
      position: 'absolute',
      display: 'block',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }),
  'button',
  [
    'disabled',
    'onClick',
    'tabIndex',
    'type',
    'data-test',
    'data-component',
    'data-trackingid',
  ],
);

class Radio extends Component {
  handleKeyPress(event) {
    const { onClick } = this.props;
    if (event.which === 13) {
      onClick(event);
    }
  }

  static contextType = WithTheme;

  render() {
    const {
      disabled,
      selected,
      size,
      tabIndex,
      onClick,
      handleBlur,
      handleFocus,
      ...rest
    } = this.props;

    return (
        <RadioImpl
          {...rest}
          data-component="Radio"
          disabled={disabled}
          selected={selected}
          size={size}
          tabIndex={tabIndex}
          onClick={onClick}
          type="button"
          data-trackingid={this.props['data-trackingid']}
        / >
    );
  }
}

Radio.propTypes = {
  /**
   * If true, the switch shows the checkedIcon
   */
  selected: PropTypes.bool,
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
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};

Radio.defaultProps = {
  selected: false,
  disabled: false,
  onClick: noop,
  size: 32,
  tabIndex: '0',
};

export { Radio };
