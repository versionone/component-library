import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import types, { standard } from './ButtonTypes';
import variants, { contained, text } from './variants';
import { createComponent, styleUtils } from '../StyleProvider';
import { Focusable } from '../Focusable';
import { Hoverable } from '../Hoverable';
import { SpacedGroup } from '../SpacedGroup';
import { Typography } from '../Typography';

const getBackgroundColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.text.background;
  return theme.Button[buttonType].background;
};
const getHoverColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.text.hover;
  return theme.Button[buttonType].hover;
};
const getFocusColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.text.focus;
  return theme.Button[buttonType].focus;
};
const getFocusBorderColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.text.focus;
  return theme.Button[buttonType].focusBorder;
};
const getBeforeColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.standard.before;
  return theme.Button[buttonType].before;
};
const getFocusBeforeColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.background;
  if(variant === "text") return theme.Button.standard.focusBefore;
  return theme.Button[buttonType].focusBefore;
};
const getBoxShadow = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return 'none';
  if(variant === "text") return theme.Button.text.boxShadow;
  return theme.Button[buttonType].boxShadow;
};
const getFocusBoxShadow = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return 'none';
  if(variant === "text") return theme.Button.text.boxShadow;
  return theme.Button[buttonType].focusBoxShadow;
};
const getBorderColor = ({ buttonType, disabled, hovered, theme, variant }) => {
  if (disabled) return theme.Button.disabled.border;
  if(variant === "text" && !hovered) return theme.Button.text.border;
  return theme.Button[buttonType].border;
};
const getColor = ({ buttonType, disabled, theme, variant }) => {
  if (disabled) return theme.Button.disabled.text;
  if(variant === "text") return theme.Button.text[buttonType];
  return theme.Button[buttonType].text;
};

const ButtonImpl = createComponent(
  ({ disabled, buttonType, theme, variant }) => ({
    alignItems: 'center',
    backgroundColor: getBackgroundColor({
      buttonType,
      disabled,
      theme,
      variant
    }),
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: getBorderColor({
      buttonType,
      disabled,
      hovered: false,
      theme,
      variant
    }),
    color: getColor({ buttonType, disabled, theme, variant}),
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    height: 32,
    justifyItems: 'center',
    outline: 'none',
    padding: '0 1rem',
    transition: '0.5s all linear',
    whiteSpace: 'nowrap',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 0,
    ':hover': {
      backgroundColor: getHoverColor({buttonType, disabled, theme, variant}),
      boxShadow: getBoxShadow({buttonType, disabled, theme, variant}),
      borderColor: getBorderColor({buttonType, disabled, hovered: true, theme, variant})
    },
    ':focus': {
      backgroundColor: getFocusColor({buttonType, disabled, theme, variant}),
      boxShadow: getFocusBoxShadow({buttonType, disabled, theme, variant}),
      borderColor: getFocusBorderColor({buttonType, disabled, theme, variant})
    },
    ':active': {
      backgroundColor: getFocusColor({buttonType, disabled, theme, variant}),
      boxShadow: getFocusBoxShadow({buttonType, disabled, theme, variant}),
      borderColor: getFocusBorderColor({buttonType, disabled, theme, variant})
    },
    ':focus:before': {
      backgroundColor: getFocusBeforeColor({buttonType, disabled, theme, variant}),
    },
    ':active:before': {
      backgroundColor: getFocusBeforeColor({buttonType, disabled, theme, variant}),
    },
  }),
  'button',
  [
    'disabled',
    'onClick',
    'onFocus',
    'onBlur',
    'onMouseEnter',
    'onMouseLeave',
    'tabIndex',
    'type',
    'data-component',
    'data-trackingid',
  ],
);

class Button extends React.Component {
  render() {
    const {
      children,
      disabled,
      onBlur,
      onClick,
      onFocus,
      tabIndex,
      type,
      variant,
      onMouseEnter,
      onMouseLeave,
      'data-trackingid': dataTrackingId,
    } = this.props;

    return (
      <Focusable onBlur={onBlur} onFocus={onFocus}>
        {({ bind: bindFocusable, focused, ref }) => (
          <Hoverable onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {({ bind: bindHoverable, hovered }) => (
              <ButtonImpl
                {...bindFocusable}
                {...bindHoverable}
                buttonType={type}
                data-component="Button"
                data-trackingid={dataTrackingId}
                disabled={disabled}
                hovered={hovered}
                innerRef={ref}
                onClick={onClick}
                tabIndex={tabIndex}
                type="button"
                variant={variant}
              >
                <SpacedGroup center>
                  <Typography is="span" variant="button">
                    {children}
                  </Typography>
                </SpacedGroup>
              </ButtonImpl>
            )}
          </Hoverable>
        )}
      </Focusable>
    );
  }
}

Button.propTypes = {
  /**
   * Contents of button.
   */
  children: PropTypes.node,
  /**
   * When true, does not respond to click events.
   */
  disabled: PropTypes.bool,
  /**
   * Event handler invoked when button loses focus.
   */
  onBlur: PropTypes.func,
  /**
   * Event handler invoked when button is clicked.
   */
  onClick: PropTypes.func,
  /**
   * Event handler invoked when button is focused.
   */
  onFocus: PropTypes.func,
  /**
   * Sets the tabindex of the button; used for tab order.
   */
  tabIndex: PropTypes.string,
  /**
   * Indicate the priority type of the button in relation to other buttons.
   */
  type: PropTypes.oneOf(types),
    /**
   * Set the variation of the button.
   */
  variant: PropTypes.oneOf(variants),
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
};
Button.defaultProps = {
  disabled: false,
  onClick: noop,
  tabIndex: '0',
  type: standard,
  variant: contained,
};

export { Button };
