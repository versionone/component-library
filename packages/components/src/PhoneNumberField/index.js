import React, { Component } from 'react';
import { noop, isFunction } from 'underscore';
import { PropTypes } from 'prop-types';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import {
  InputFieldContainer,
  InputStateIcon,
  PrependIconContainer,
  AppendIconContainer,
  InputField,
  WithFormFieldState,
} from "../FormUtils";

const Root = createComponent(
  ({ fullWidth, stretch }) => ({
    ...styleUtils.conditionalStyle(
      fullWidth || stretch,
      'width',
      '100%',
      'unset',
    ),
    ...styleUtils.conditionalStyle(fullWidth, 'flex', 'auto'),
    ...styleUtils.conditionalStyle(stretch, 'flex', 1),
  }),
  'div',
  ['data-component'],
);

class PhoneNumberField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const {
      inlineEdit,
      success,
      loading,
      dirty,
      error,
      defaultValue,
      disabled,
      fullWidth,
      stretch,
      height,
      hintText,
      onKeyDown,
      prependIcon,
      appendIcon,
      tabIndex,
      value,
    } = this.props;

    const renderChildrenWithFormState = ({
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      inputRef,
      focused,
      hovered,
    }) => {
      const shouldShowPrependIcon = !inlineEdit && Boolean(prependIcon);
      const shouldShowAppendIcon = !inlineEdit && Boolean(appendIcon);

      const appendIconContainer = shouldShowAppendIcon && (
        <AppendIconContainer focused={focused}>
          {typeof appendIcon === 'string'
            ? appendIcon
            : React.cloneElement(appendIcon)}
        </AppendIconContainer>
      );

      const prependIconContainer = shouldShowPrependIcon && (
        <PrependIconContainer focused={focused}>
          {typeof prependIcon === 'string'
            ? prependIcon
            : React.cloneElement(prependIcon)}
        </PrependIconContainer>
      );

      return (
        <StyleProvider>
          <Root
            data-component="PhoneNumberField"
            fullWidth={fullWidth}
            stretch={stretch}
          >
            <InputFieldContainer
              inlineEdit={inlineEdit}
              success={success}
              dirty={dirty}
              error={error}
              disabled={disabled}
              focused={focused}
              fullWidth={fullWidth}
              stretch={stretch}
              height={height}
              isHeightCapped
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {prependIconContainer}
              <InputField
                dirty={dirty}
                defaultValue={defaultValue}
                disabled={disabled}
                height={height}
                onBlur={onBlur}
                onChange={this.handleChange}
                onFocus={onFocus}
                onKeyDown={this.handleKeyDown}
                placeholder={hintText}
                innerRef={inputRef}
                tabIndex={tabIndex}
                type="tel"
                value={value}
              />
              <InputStateIcon
                inlineEdit={inlineEdit}
                disabled={disabled}
                success={success}
                hovered={hovered}
                loading={loading}
                error={error}
              />
              {appendIconContainer}
            </InputFieldContainer>
          </Root>
        </StyleProvider>
      );
    };

    return (
      <WithFormFieldState
        inlineEdit={this.props.inlineEdit}
        focused={this.props.focused}
        hovered={this.props.hovered}
        onFocus={this.props.onFocus}
        onBlur={this.props.onBlur}
      >
        {renderChildrenWithFormState}
      </WithFormFieldState>
    );
  }

  handleChange(evt) {
    const value = evt.target.value;
    this.props.onChange(evt, value);
  }

  handleKeyDown(evt) {
    const isNumberKey = evt.which >= 48 && evt.which <= 57;
    const isNumberPadKey = evt.which >= 96 && evt.which <= 105;
    const isHyphen = evt.which === 189;
    const isPlus = evt.shiftKey && evt.which === 187;
    const arrowKeys = evt.which >= 37 && evt.which <= 40;
    const spaceKey = evt.which === 32;
    const backspaceKey = evt.which === 8;

    const isValidKey =
      isNumberKey ||
      isNumberPadKey ||
      isHyphen ||
      isPlus ||
      arrowKeys ||
      spaceKey ||
      backspaceKey;

    if (!isValidKey) {
      evt.preventDefault();
      return;
    }
    isFunction(this.props.onKeyDown) && this.props.onKeyDown();
  }
}
PhoneNumberField.propTypes = {
  /**
   * change event handler.
   */
  onChange: PropTypes.func,
  /**
   * keydown event handler.
   */
  onKeyDown: PropTypes.func,
  /**
   * Prepended to input.
   */
  prependIcon: PropTypes.node,
  /**
   * Callback providing the ref of the input field.
   */
  innerRef: PropTypes.func,
  /**
   * Value to be applied when using as a controlled input.
   */
  value: PropTypes.string,

  /**********************
	Common InputField Props
	**********************/

  /**
   * Indicates the tab order within the document.
   */
  tabIndex: PropTypes.string,
  /**
   * Inline Editable
   */
  inlineEdit: PropTypes.bool,
  /**
   * Indicates if the field's value has changed
   */
  dirty: PropTypes.bool,
  /**
   * Indicates if the field has an error
   */
  error: PropTypes.string,
  /**
   * Default value to be applied when using as an uncontrolled input.
   */
  defaultValue: PropTypes.string,
  /**
   * Indicates field is disabled from user input; no events will fire.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates the page focus is this text field.
   */
  focused: PropTypes.bool,
  /**
   * Indicates the input to take the full width of its parent.
   * See stretch, (when strech is true this fullWidth is overriden)
   */
  fullWidth: PropTypes.bool,
  /**
   * Indicates the input to take the remaining width of its parent.
   * See fullWidth
   */
  stretch: PropTypes.bool,
  /**
   * Overall height of the text field.
   */
  height: PropTypes.number,
  /**
   * Placeholder (hint) text.
   */
  hintText: PropTypes.string,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
};

PhoneNumberField.defaultProps = {
  onChange: noop,
  onKeyDown: noop,
  innerRef: noop,
  /**********************
	 Common InputField Props
	 **********************/
  tabIndex: '0',
  stretch: false,
  fullWidth: false,
  height: 32,
  hintText: '',
  disabled: false,
  dirty: false,
  focused: false,
  inlineEdit: false,
  error: '',
  onBlur: noop,
  onFocus: noop,
};

export { PhoneNumberField };
