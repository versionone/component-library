import PropTypes from 'prop-types';
import React, { Component} from 'react';
import { noop } from 'underscore';
import { ControlledCheckbox } from './ControlledCheckbox';

class Checkbox extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked,
    };
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck(ev) {
    const { onClick } = this.props;
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
    onClick(ev);
  }

  render() {
    const {
      size,
      id,
      onClick,
      disabled,
      'data-trackingid': trackingId,
      ...rest
    } = this.props;
    const { checked } = this.state;

    return (
      <ControlledCheckbox
        {...rest}
        size={size}
        checked={checked}
        id={id}
        trackingId={trackingId}
        disabled={disabled}
        onChange={this.toggleCheck}
      />
    );
  }
}

Checkbox.propTypes = {
  /**
   * If true the checkbox is checked
   */
  checked: PropTypes.bool,
  /**
   * Disables the control
   */
  disabled: PropTypes.bool,
  /**
   * Function run when the checkbox is clicked
   */
  onClick: PropTypes.func,
  /**
   * The size of the checkbox
   */
  size: PropTypes.number,
  /**
   * Tab index of the switch
   */
  tabIndex: PropTypes.string,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
  /**
   * Identifier to associate label with control
   *  */
  id: PropTypes.string,
};

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  onClick: noop,
  size: 16,
  tabIndex: '0',
  onFocus: noop,
  onBlur: noop,
};

export { Checkbox };
