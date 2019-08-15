import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import types, { standard } from './ButtonTypes';
import { createComponent, styleUtils } from '../StyleProvider';
import { Focusable } from '../Focusable';
import { Hoverable } from '../Hoverable';
import { SpacedGroup } from '../SpacedGroup';
import { Typography } from '../Typography';

const getBackgroundColor = ({
  buttonType,
  disabled,
  hovered,
  theme,
}) => {
  if (disabled) return theme.Button.disabled.background;
  if (hovered) return theme.Button[buttonType].hover;
  return theme.Button[buttonType].background;
};
const getBorderColor = ({ buttonType, disabled, theme }) => {
  if (disabled) return theme.Button.disabled.border;
  return theme.Button[buttonType].border;
};
const getColor = ({ buttonType, disabled, theme }) => {
  if (disabled) return theme.Button.disabled.text;
  return theme.Button[buttonType].text;
};

const ButtonImpl = createComponent(
  ({ disabled, buttonType, focused, hovered, theme }) => ({
    alignItems: 'center',
    backgroundColor: getBackgroundColor({
      buttonType,
      disabled,
      hovered,
      theme,
    }),
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: getBorderColor({
      buttonType,
      disabled,
      theme,
    }),
    ...styleUtils.conditionalStyle(
      hovered && !disabled,
      'box-shadow',
      theme.Button[buttonType].boxShadow,
    ),
    color: getColor({ buttonType, disabled, theme}),
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex',
    height: 32,
    justifyItems: 'center',
    outline: 'none',
    padding: '0 1rem',
    transition: '0.5s all linear',
    whiteSpace: 'nowrap',
    ...styleUtils.conditionalStyles(
      hovered,
      'background-color',
      getBackgroundColor({
        buttonType,
        disabled,
        hovered,
        theme,
      }),
    ),
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
                focused={focused}
                hovered={hovered}
                innerRef={ref}
                onClick={onClick}
                tabIndex={tabIndex}
                type="button"
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
};

export { Button };
