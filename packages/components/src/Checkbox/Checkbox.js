import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { CheckIcon } from '@versionone/icons';
import { createComponent } from '../StyleProvider';

const CheckboxImpl = createComponent(
    ({ checked, size, theme }) => ({
      height: size,
      width: size,
      alignItems: 'center',
      position: 'absolute',
      outline: 'none',
      top: 0,
      opacity: 0,
      // ':before': {
      //   content:'""',
      //   color: theme.Button.standard.text,
      //   height: size,
      //   width: size,
      //   minWidth: size,
      //   minHeight: size,
      //   borderRadius: '3px',
      //   border: '2px solid transparent',
      //   borderColor: theme.Radio.selected,
      //   backgroundColor: theme.Radio.background,
      //   cursor: 'pointer',
      //   display: 'flex',
      //   justifyContent: 'center',
      //   alignItems: 'center',
      // },
      // ':after': {
      //   content:'""',
      //   color: theme.Button.standard.text,
      //   height: '6px',
      //   width: '9px',
      //   borderLeft: '2px solid',
      //   borderBottom: '2px solid',
      //   transform: 'rotate(-45deg)',
      // },
  }),
  'input',
  ['data-component', 'data-test', 'data-trackingid', 'onClick', 'type', 'id', 'onChange', 'checked'],
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
      onChange,
      ...rest
    } = this.props;
    const { checked, toggleCheck } = this.state

      return (
        <span style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          margin: '4px',
          width: size,
          height: size,}}>
          <CheckboxImpl
            {...rest}
            type="checkbox"
            size={size}
            id={id}
            checked={checked}
            onClick={toggleCheck(checked)}
            onChange={onChange}
            data-trackingid={this.props['data-trackingid']}
          />
          <span onClick={toggleCheck(checked)}
          style={{
            width: size,
            height: size,
            borderRadius: '3px',
            border: '2px solid currentColor',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',}}>
              {React.cloneElement(<CheckIcon/>, {
                size,
                color: checked ? '#000' : 'transparent',
                display: 'inline-block',
                position: 'absolute',
                zIndex: 100,
                top: 4,
            })}
          </span>
        </span>
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
   * Function run when the checkbox is clicked
   */
  onClick: PropTypes.func,
  /**
   * Function run when the checkbox is changed
   */
  onChange: PropTypes.func,
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
  onChange: noop,
  size: 32,
  tabIndex: '0',
  onFocus: noop,
  onBlur: noop,
  id: "form-id",
};

export { Checkbox };
