import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import { createComponent, WithTheme } from '../StyleProvider';

const Root = createComponent(
  ({ size }) => ({
    width: size,
    height: size,
    minWidth: size,
    minHeight: size,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  'div',
  ['data-component', 'data-test', 'onClick'],
);

const IconSwitchImpl = createComponent(
  ({ disabled, size, fill, theme }) => ({
    alignItems: 'center',
    borderColor: fill ? theme.Button.icon.background : 'transparent',
    backgroundColor: fill
      ? theme.Button.icon.background
      : theme.Button.text.background,
    color: theme.Button.standard.text,
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
    ':hover': {
      borderColor: !disabled ? 'rgba(67, 128, 152, 0.5)' : 'transparent',
      boxShadow: !disabled ? '0 0 7px 0 rgba(67, 128, 152, 0.3)' : 'none',
    },
    ':hover:before': {
      left: 0,
      width: '100%',
    },
    ':focus': {
      borderColor: !disabled ? 'rgba(30,170,189,0.7)' : 'transparent',
      boxShadow: !disabled ? '0 0 7px 0 rgba(30,170,189,0.5)' : 'none',
    },
    ':before': {
      backgroundColor: !disabled ? theme.Button.text.hover : 'transparent',
      content:'""',
      width: '0%',
      height: '100%',
      top: 0,
      left: '100%',
      transition: '0.5s all ease-out',
      position: 'absolute',
      zIndex: 'auto',
    },
  }),
  'button',
  [
    'disabled',
    'onBlur',
    'onClick',
    'onFocus',
    'tabIndex',
    'type',
    'data-test',
    'data-component',
    'data-trackingid',
  ],
);

class IconSwitch extends Component {
  handleKeyPress(event) {
    const { onClick } = this.props;
    if (event.which === 13) {
      onClick(event);
    }
  }

  static contextType = WithTheme;

  render() {
    const icon = this.props.checked
      ? this.props.checkedIcon
      : this.props.uncheckedIcon;
    const {
      disabled,
      checkedIcon,
      uncheckedIcon,
      size,
      tabIndex,
      onClick,
      ...rest
    } = this.props;
    const theme = this.context;

    return (
      <Root
        data-component="Switch"
        data-test={this.props['data-test']}
        onClick={onClick}
        size={size}
      >
        <IconSwitchImpl
          {...rest}
          data-component="IconSwitch"
          buttonType="standard"
          disabled={disabled}
          size={size}
          tabIndex={tabIndex}
          type="button"
          data-trackingid={this.props['data-trackingid']}
        >
          {React.cloneElement(icon, {
            size: size - 16,
            color: theme.Button.standard.text,
          })}
        </IconSwitchImpl>
      </Root>
    );
  }
}

IconSwitch.propTypes = {
  /**
   * If true, the switch shows the checkedIcon
   */
  checked: PropTypes.bool,
  /**
   * When true, does not respond to click events.
   */
  disabled: PropTypes.bool,
  /**
   * Icon to be used when switch is checeked.
   */
  checkedIcon: PropTypes.node.isRequired,
  /**
   * If true the background is filled to indicate checked/unchecked
   */
  fill: PropTypes.bool,
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
   * Size of the button
   */
  size: PropTypes.number,
  /**
   * Sets the tabindex of the button; used for tab order.
   */
  tabIndex: PropTypes.string,
  /**
   * Icon to be used when switch is uncheceked.
   */
  uncheckedIcon: PropTypes.node.isRequired,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};

IconSwitch.defaultProps = {
  checked: false,
  disabled: false,
  onClick: noop,
  onBlur: noop,
  onFocus: noop,
  size: 32,
  tabIndex: '0',
  fill: false,
};

export { IconSwitch };
