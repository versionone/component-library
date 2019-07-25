import React, { Component } from 'react';
import { noop } from 'underscore';
import { PropTypes } from 'prop-types';
import { ShowIcon, HideIcon } from '@versionone/icons';
import { createComponent, styleUtils } from '../StyleProvider';
import {
  InputFieldContainer,
  InputStateIcon,
  PrependIconContainer,
  AppendIconContainer,
  InputField,
  TextareaField,
  WithFormFieldState,
} from '../FormUtils';

const Root = createComponent(
  ({ fullWidth, stretch, theme }) => ({
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

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      value: props.value,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleTogglePassword = this.handleTogglePassword.bind(this);
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
      multiline,
      password,
      value,
    } = this.props;

    const { showPassword } = this.state;

    const renderChildrenWithFormState = ({
      focused,
      hovered,
      inputRef,
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
    }) => {
      const shouldShowPrependIcon = !inlineEdit && Boolean(prependIcon);
      const shouldShowAppendIcon =
        !inlineEdit && (Boolean(appendIcon) || password);

      const appendIconContainer =
        shouldShowAppendIcon &&
        (password ? (
          <AppendIconContainer focused={focused}>
            <span title="toggle password" onClick={this.handleTogglePassword}>
              {showPassword ? <ShowIcon /> : <HideIcon />}
            </span>
          </AppendIconContainer>
        ) : (
          <AppendIconContainer focused={focused}>
            {typeof appendIcon === 'string'
              ? appendIcon
              : React.cloneElement(appendIcon)}
          </AppendIconContainer>
        ));

      const prependIconContainer = shouldShowPrependIcon && (
        <PrependIconContainer focused={focused}>
          {typeof prependIcon === 'string'
            ? prependIcon
            : React.cloneElement(prependIcon)}
        </PrependIconContainer>
      );

      const Input = multiline ? TextareaField : InputField;

      return (
        <Root
          data-component="TextField"
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
            multiline={multiline}
            height={height}
            isHeightCapped={!multiline}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {prependIconContainer}
            <Input
              dirty={dirty}
              defaultValue={defaultValue}
              disabled={disabled}
              multiline={multiline}
              rows={multiline ? '1' : null}
              height={height}
              onBlur={onBlur}
              onChange={this.handleChange}
              onFocus={onFocus}
              onKeyDown={onKeyDown}
              placeholder={hintText}
              innerRef={inputRef}
              tabIndex={tabIndex}
              type={password && !showPassword ? 'password' : 'text'}
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
      );
    };

    return (
      <WithFormFieldState
        inlineEdit={this.props.inlineEdit}
        focused={this.props.focused}
        hovered={this.props.hovered}
        onBlur={this.props.onBlur}
        onFocus={this.props.onFocus}
      >
        {renderChildrenWithFormState}
      </WithFormFieldState>
    );
  }

  handleChange(evt) {
    const {value} = evt.target;
    this.props.onChange(evt, value);
  }

  handleTogglePassword() {
    if (this.props.password)
      this.setState({ showPassword: !this.state.showPassword });
  }
}
TextField.propTypes = {
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
  /**
   * If true the TextField's height can be resized
   */
  multiline: PropTypes.bool,

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

TextField.defaultProps = {
  onChange: noop,
  onKeyDown: noop,
  innerRef: noop,
  multiline: false,
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

export { TextField };
