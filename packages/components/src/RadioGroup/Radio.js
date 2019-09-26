import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import { CheckIcon, CloseIcon } from '@versionone/icons';
import { createComponent, WithTheme } from '../StyleProvider';

const RadioImpl = createComponent(
  ({ disabled, size, theme }) => ({
    alignItems: 'center',
    color: theme.Button.standard.text,
    height: size,
    width: size,
    minWidth: size,
    minHeight: size,
    borderRadius: '50%',
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
    const icon = this.props.selected
      ? this.props.checkedIcon
      : this.props.uncheckedIcon;
    const {
      disabled,
      checkedIcon,
      uncheckedIcon,
      selected,
      size,
      tabIndex,
      onClick,
      handleSelection,
      handleBlur,
      handleFocus,
      ...rest
    } = this.props;
    const theme = this.context;

    return (
        <RadioImpl
          {...rest}
          data-component="Radio"
          disabled={disabled}
          selected={selected}
          size={size}
          tabIndex={tabIndex}
          onClick={handleSelection}
          type="button"
          data-trackingid={this.props['data-trackingid']}
        >
          {React.cloneElement(icon, {
            size: size - 16,
            color: selected ? theme.Radio.selected : theme.Radio.main,
          })}
        </RadioImpl>
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
   * Icon to be used when switch is checeked.
   */
  checkedIcon: PropTypes.node,
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
  uncheckedIcon: PropTypes.node,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};

Radio.defaultProps = {
  checked: false,
  disabled: false,
  onClick: noop,
  size: 32,
  tabIndex: '0',
  checkedIcon: <CheckIcon />,
  uncheckedIcon: <CloseIcon />, 
};

export { Radio };
