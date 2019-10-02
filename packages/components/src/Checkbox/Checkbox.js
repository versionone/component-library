import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';

const CheckboxImpl = createComponent(
    ({ checked, size, theme }) => ({
      height: size,
      width: size,
      alignItems: 'center',
      position: 'relative',
      outline: 'none',
      margin: '4px',
      ':before': {
        content:'""',
        color: theme.Button.standard.text,
        height: size,
        width: size,
        minWidth: size,
        minHeight: size,
        border: '3px solid transparent',
        borderColor: checked ? theme.Radio.selected : theme.Radio.main,
        backgroundColor: theme.Radio.background,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      ':after': {
        content:'""',
        width: size/2,
        height: size/2,
        backgroundColor: checked ? theme.Radio.selected : 'transparent', 
        position: 'absolute',
        display: 'block',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
  }),
  'input',
  ['data-component', 'data-test', 'data-trackingid', 'onClick', 'type'],
);

class Checkbox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      checked: props.checked,
      toggleCheck: checked => () => {
        this.setState({
          checked: !checked,
        });
      },
    };
  }

  render() {
    const {
      size,
      id,
      ...rest
    } = this.props;
    const { checked, toggleCheck } = this.state

      return (
        <CheckboxImpl
        {...rest}
        type="checkbox"
        size={size}
        id={id}
        checked={checked}
        onClick={toggleCheck(checked)}
        data-trackingid={this.props['data-trackingid']}
        />
      )
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
   * Function run when the switch is clicked
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
  size: 32,
  tabIndex: '0',
  onFocus: noop,
  onBlur: noop,
  id: "form_id",
};

export { Checkbox };
