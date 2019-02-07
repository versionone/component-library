import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import types, { standard } from './ButtonTypes';
import { Focusable } from '../Focusable';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';

const getBackgroundColor = ({ hovered, theme, type }) => {
  if (type === standard) {
    if (hovered) return theme.Button[type].invert;
    return 'transparent';
  }
  if (hovered) return theme.Button[type].main;
  return 'transparent';
};
const getColor = ({ disabled, hovered, theme, type }) => {
  if (disabled) return theme.Button.disabled.main;
  if (type === standard) {
    if (hovered) return theme.Button[type].main;
    return theme.Button[type].invert;
  }
  if (hovered) return theme.Button[type].invert;
  return theme.Button[type].main;
};

const ButtonImpl = createComponent(
  ({ disabled, buttonType, size, focused, theme }) => ({
    alignItems: 'center',
    borderColor: 'transparent',
    height: size,
    width: size,
    minWidth: size,
    minHeight: size,
    borderRadius: '50%',
    borderWidth: 1,
    borderStyle: 'solid',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    fontWeight: 600,
    lineHeight: `${size}px`,
    justifyContent: 'center',
    letterSpacing: '0.03rem',
    outline: 'none',
    padding: 0,
    transition: '0.5s all linear',
    whiteSpace: 'nowrap',
    backgroundColor: getBackgroundColor({
      disabled,
      hovered: false,
      theme,
      type: buttonType,
    }),
    color: getColor({
      disabled,
      hovered: false,
      theme,
      type: buttonType,
    }),
    ':hover': {
      backgroundColor: getBackgroundColor({
        disabled,
        hovered: true,
        theme,
        type: buttonType,
      }),
      color: getColor({
        disabled,
        hovered: true,
        theme,
        type: buttonType,
      }),
    },
    ...styleUtils.conditionalStyles(focused, theme.focused),
  }),
  'button',
  [
    'disabled',
    'onBlur',
    'onClick',
    'onFocus',
    'onMouseEnter',
    'onMouseLeave',
    'tabIndex',
    'type',
    'data-test',
    'data-component',
    'data-trackingid',
  ],
);

class IconButton extends Component {
  render() {
    const {
      disabled,
      icon,
      focused,
      size,
      tabIndex,
      type,
      onFocus,
      onBlur,
      ...rest
    } = this.props;

    return (
      <StyleProvider>
        <Focusable focused={focused} onFocus={onFocus} onBlur={onBlur}>
          {({ ref, bind, focused }) => (
            <ButtonImpl
              data-component="IconButton"
              data-trackingid={this.props['data-trackingid']}
              buttonType={type}
              disabled={disabled}
              size={size}
              tabIndex={tabIndex}
              type="button"
              {...rest}
              {...bind}
              innerRef={ref}
              focused={focused}
            >
              {React.createElement(icon, {
                size: size - 16,
              })}
            </ButtonImpl>
          )}
        </Focusable>
      </StyleProvider>
    );
  }
}
IconButton.propTypes = {
  /**
   * When true, does not respond to click events.
   */
  disabled: PropTypes.bool,
  /**
   * Icon to be used within the Button.
   */
  icon: PropTypes.any.isRequired,
  /** Event handler invoked when button loses focus. */
  onBlur: PropTypes.func,
  /**
   * Event handler invoked when button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Event handler invoked when button is focused.
   */
  onFocus: PropTypes.func,
  /** Event handler invoked when mouse enters button. */
  onMouseEnter: PropTypes.func,
  /** Event handler invoked when mouse leaves button. */
  onMouseLeave: PropTypes.func,
  /**
   * Size of the button
   */
  size: PropTypes.number,
  /**
   * Sets the tabindex of the button; used for tab order.
   */
  tabIndex: PropTypes.string,
  /**
   * Accessible text for the icon.
   */
  title: PropTypes.string.isRequired,
  /**
   * Indicate the priority type of the button in relation to other buttons.
   */
  type: PropTypes.oneOf(types),
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};
IconButton.defaultProps = {
  disabled: false,
  onBlur: noop,
  onClick: noop,
  onFocus: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  size: 32,
  tabIndex: '0',
  type: standard,
};

export default IconButton;
