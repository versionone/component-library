import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import types, { standard } from './ButtonTypes';
import { Focusable } from '../Focusable';
import { createComponent, styleUtils, WithTheme } from '../StyleProvider';

const getBackgroundColor = ({ disabled, type, hovered, theme }) => {
  if (disabled) return theme.Button.disabled.background;
  if (hovered) return theme.Button[type].hover;
  return theme.Button[type].background;
};
const getColor = ({ type, disabled, theme }) => {
  if (disabled) return theme.Button.disabled.text;
  return theme.Button[type].text;
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
    overflow: 'hidden',
    padding: 0,
    position: 'relative',
    transition: '0.5s all linear',
    whiteSpace: 'nowrap',
    zIndex: 0,
    backgroundColor: getBackgroundColor({
      disabled,
      type: buttonType,
      hovered: false,
      theme,
    }),
    color: getColor({
      type: buttonType,
      disabled,
      theme,
    }),
    ':hover': {
      borderColor: !disabled ? theme.Button.icon.hoverBorder : 'transparent',
      boxShadow: !disabled ? theme.Button.icon.hoverBoxShadow : 'none',
      backgroundColor: getBackgroundColor({
        disabled,
        type: buttonType,
        hovered: true,
        theme,
      }),
    },
    ':focus': {
      borderColor: !disabled ? theme.Button.icon.focusBorder : 'transparent',
      boxShadow: !disabled ? theme.Button.icon.focusBoxShadow : 'none',
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
      rotate,
      disabled,
      icon,
      focused,
      size,
      tabIndex,
      type,
      onFocus,
      onBlur,
      title,
      ...rest
    } = this.props;

    return (
      <WithTheme>
        {theme => {
          return (
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
                    size: Math.floor(size / 2),
                    title,
                    color: theme.Button[type].text,
                    rotate
                  })}
                </ButtonImpl>
              )}
            </Focusable>
          );
        }}
      </WithTheme>
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
  /**
   * Number of degrees to rotate the icon
   */
  rotate: PropTypes.number,
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

export { IconButton };
