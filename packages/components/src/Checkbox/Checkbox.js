import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { CheckIcon } from '@versionone/icons';
import { createComponent, WithTheme } from '../StyleProvider';

const CheckboxImpl = createComponent(
  ({ size, theme }) => ({
    position: 'absolute',
    opacity: 0,
  }),
  'input',
  [
    'data-component',
    'data-test',
    'data-trackingid',
    'onClick',
    'type',
    'id',
    'onChange',
    'checked',
    'name',
  ],
);

class Checkbox extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      checked: props.checked,
    };
    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck(ev) {
    this.setState(prevState => ({
      checked: !prevState.checked,
    }));
    this.props.onClick(ev);
  }

  render() {
    const { size, id, onClick, disabled, ...rest } = this.props;
    const { checked } = this.state;

    return (
      <WithTheme>
        {theme => {
          const color = theme.Checkbox.main;

          return (
            <React.Fragment>
              <CheckboxImpl
                {...rest}
                onChange={this.toggleCheck}
                type="checkbox"
                size={size}
                checked={checked}
                id={id}
                data-trackingid={this.props['data-trackingid']}
              />
              <span
                style={{
                  width: size,
                  height: size,
                  borderRadius: '3px',
                  border: '2px solid transparent',
                  borderColor: color,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'relative',
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
              >
                {React.cloneElement(<CheckIcon />, {
                  size,
                  color: checked ? color : 'transparent',
                  display: 'inline-block',
                  position: 'absolute',
                  top: 4,
                })}
              </span>
            </React.Fragment>
          );
        }}
      </WithTheme>
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
  size: 24,
  tabIndex: '0',
  onFocus: noop,
  onBlur: noop,
};

export { Checkbox };
