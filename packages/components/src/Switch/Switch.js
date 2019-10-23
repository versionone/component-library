import PropTypes from 'prop-types';
import React from 'react';
import { noop, isFunction } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';
import { WithFormFieldState } from '../FormUtils';

const Root = createComponent(
  () => ({
    width: 62,
    display: 'inline-flex',
    zIndex: 0,
    position: 'relative',
    flexShrink: 0,
    verticalAlign: 'middle',
  }),
  'span',
  ['data-component', 'data-test', 'data-trackingid', 'onClick', 'onKeyDown'],
);

const ButtonBase = createComponent(
  ({ checked, disabled }) => ({
    width: 48,
    height: 48,
    padding: 0,
    ...styleUtils.conditionalStyle(disabled, 'color', '#bdbdbd'),
    ...styleUtils.conditionalStyle(
      checked && !disabled,
      'color',
      palette.cerulean,
    ),
    ...styleUtils.conditionalStyle(!(checked || disabled), 'color', '#fafafa'),
    ...styleUtils.conditionalStyle(checked, 'transform', 'translateX(14px)'),
    transition: 'transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    display: 'inline-flex',
    alignItems: 'center',
    flex: '0 0 auto',
    overflow: 'visible',
    fontSize: '1.5rem',
    textAlign: 'center',
    borderRadius: '50%',
    border: 0,
    margin: 0,
    cursor: 'pointer',
    outline: 'none',
    position: 'relative',
    userSelect: 'none',
    verticalAlign: 'middle',
    justifyContent: 'center',
    textDecoration: 'none',
    backgroundColor: 'transparent',
  }),
  'span',
);

const Button = createComponent(
  () => ({
    width: '100%',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'inherit',
  }),
  'span',
);

const Ball = createComponent(
  ({ checked }) => ({
    width: 20,
    height: 20,
    ...styleUtils.conditionalStyle(
      checked,
      'box-shadow',
      '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
      '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    ),
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  }),
  'span',
);

const Input = createComponent(
  () => ({
    top: 0,
    left: 0,
    cursor: 'inherit',
    width: '100%',
    height: '100%',
    margin: 0,
    opacity: 0,
    padding: 0,
    position: 'absolute',
  }),
  'input',
  ['type', 'tabIndex', 'onBlur', 'onFocus', 'onClick', 'onKeyDown', 'disabled'],
);

const Ripple = createComponent(
  ({ disabled, checked, focused }) => ({
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    zIndex: 0,
    position: 'absolute',
    overflow: 'hidden',
    borderRadius: 'inherit',
    pointerEvents: 'none',
    ...styleUtils.conditionalStyle(
      focused && checked && !disabled,
      'background-color',
      palette.cerulean,
    ),
    ...styleUtils.conditionalStyle(
      focused && !checked && !disabled,
      'background-color',
      palette.ghost,
    ),
    ...styleUtils.conditionalStyle(
      disabled,
      'background-color',
      palette.transparent,
    ),
    ...styleUtils.conditionalStyle(focused, 'opacity', 0.38),
  }),
  'span',
);

const Bar = createComponent(
  ({ disabled, checked }) => ({
    boxSizing: 'border-box',
    position: 'absolute',
    zIndex: -1,
    top: '50%',
    left: '50%',
    width: 34,
    height: 14,
    display: 'block',
    borderRadius: 7,
    marginTop: -7,
    marginLeft: -17,
    transition:
      'opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    ...styleUtils.conditionalStyle(
      checked,
      'background-color',
      palette.cerulean,
      palette.obsidian,
    ),
    ...styleUtils.conditionalStyle(checked, 'opacity', 0.5),
    ...styleUtils.conditionalStyle(disabled, 'opacity', 0.12),
    ...styleUtils.conditionalStyle(!(disabled || checked), 'opacity', 0.38),
  }),
  'span',
);

class Switch extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(event) {
    const { onClick } = this.props;
    const isEnter = event.which === 13;
    if (isEnter && isFunction(onClick)) {
      onClick(event);
    }
  }

  render() {
    const {
      'data-test': dataTest,
      'data-trackingid': dataTrackingid,
      checked,
      tabIndex,
      disabled,
      value,
      inlineEdit,
      onFocus,
      onBlur,
      onClick,
      focused,
    } = this.props;
    const renderChildrenWithFormState = ({
      onBlur: handleBlur,
      onFocus: handleFocus,
      focused: isFocused,
    }) => {
      return (
        <Root
          data-component="Switch"
          data-test={dataTest}
          data-trackingid={dataTrackingid}
          onKeyDown={this.handleKeyDown}
          onClick={onClick}
        >
          <ButtonBase checked={checked} disabled={disabled}>
            <Button>
              <Ball checked={checked} />
              <Input
                checked={checked}
                tabIndex={tabIndex}
                disabled={disabled}
                value={value}
                onClick={this.handleKeyDown}
                onBlur={handleBlur}
                onFocus={handleFocus}
                type="checkbox"
              />
            </Button>
            <Ripple
              focused={isFocused}
              disabled={disabled}
              checked={checked}
              onClick={onClick}
            />
          </ButtonBase>
          <Bar disabled={disabled} checked={checked} />
        </Root>
      );
    };

    return (
      <WithFormFieldState
        inlineEdit={inlineEdit}
        focused={focused}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {renderChildrenWithFormState}
      </WithFormFieldState>
    );
  }
}

Switch.propTypes = {
  /**
   * If true the switch is on
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
   * input value
   */
  value: PropTypes.string,
  /**
   * Tab index of the switch
   */
  tabIndex: PropTypes.string,
  /**
   * type
   */
  type: PropTypes.oneOf(['primary', 'secondary', 'default']),
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
   * If `true` the control is inline editable
   */
  inlineEdit: PropTypes.bool,
  /**
   * If `true` the control is focused
   */
  focused: PropTypes.bool,
};

Switch.defaultProps = {
  checked: false,
  disabled: false,
  onClick: noop,
  value: '',
  tabIndex: '0',
  type: 'default',
  onFocus: noop,
  onBlur: noop,
  inlineEdit: false,
  focused: false,
};

export { Switch };
