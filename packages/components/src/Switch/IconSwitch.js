import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import { createComponent, StyleProvider } from '../StyleProvider';
import { palette } from '../palette';

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
    borderColor: fill ? palette.shuttle : palette.transparent,
    backgroundColor: fill ? palette.shuttle : palette.transparent,
    color: theme.Button.standard.invert,
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
    ':focus': {
      ...theme.focused,
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
    event.which === 13 &&
      isFunction(this.props.onClick) &&
      this.props.onClick(event);
  }

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

    return (
      <StyleProvider>
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
            })}
          </IconSwitchImpl>
        </Root>
      </StyleProvider>
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
   * If true the background is solid gunmetal to indicate checked
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
