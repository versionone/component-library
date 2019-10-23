import React, { Component, createRef } from 'react';
import { noop } from 'underscore';
import { PropTypes } from 'prop-types';
import { createComponent, styleUtils, WithTheme } from '../StyleProvider';
import { UploadButton } from './UploadButton';
import { DropZoneLarge } from './DropZoneLarge';
import { DropZoneSmall } from './DropZoneSmall';

const Root = createComponent(
  ({ width, height }) => ({
    ...styleUtils.conditionalStyle(width, 'width', width),
    ...styleUtils.conditionalStyle(height, 'height', height),
  }),
  'div',
  ['data-component', 'data-test'],
);

const InputField = createComponent(
  () => ({
    opacity: 0,
    overflow: 'hidden',
    position: 'fixed',
    'z-index': -1,
    top: -10000,
    ':focus': {
      outline: 'none',
    },
  }),
  'input',
  [
    'type',
    'accept',
    'multiple',
    'tabIndex',
    'onBlur',
    'onChange',
    'onFocus',
    'disabled',
  ],
);

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue,
      hovered: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.simulateClick = this.simulateClick.bind(this);
    this.inputEl = createRef();
  }

  static getDerivedStateFromProps(props) {
    return {
      value: props.value,
    };
  }

  componentDidMount() {
    const { innerRef } = this.props;
    const { focused } = this.state;
    if (focused) {
      this.inputEl.current.focus();
    }
    innerRef(this.inputEl);
  }

  componentDidUpdate(prevProps, prevState) {
    const { focused } = this.state;
    if (!prevState.focused && focused) {
      this.inputEl.current.focus();
    }
  }

  render() {
    const {
      primaryText,
      variant,
      accept,
      multiple,
      tabIndex,
      disabled,
      'data-test': dataTest,
      'data-trackingid': dataTrackingId,
    } = this.props;

    const isButton = variant === 'button';

    const UploadImpl = (() => {
      if (isButton) {
        return UploadButton;
      }
      if (primaryText) {
        return DropZoneLarge;
      }
      return DropZoneSmall;
    })();

    const dimensions = (() => {
      if (isButton) {
        return {};
      }
      if (primaryText) {
        return { width: 320, height: 200 };
      }
      return { width: 100, height: 100 };
    })();

    const input = (
      <InputField
        type="file"
        accept={accept}
        multiple={multiple}
        innerRef={this.inputEl}
        tabIndex={tabIndex}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        disabled={disabled}
      />
    );

    return (
      <Root data-component="Upload" data-test={dataTest} {...dimensions}>
        <WithTheme>
          {theme => {
            return (
              <label data-trackingid={dataTrackingId}>
                <UploadImpl
                  {...this.props}
                  {...this.state}
                  color={theme.Upload.main}
                  iconColor={theme.Upload.iconColor}
                  onClick={this.simulateClick}
                >
                  {input}
                </UploadImpl>
              </label>
            );
          }}
        </WithTheme>
      </Root>
    );
  }

  handleBlur(evt) {
    const { onBlur } = this.props;
    this.setState({ focused: false });
    onBlur(evt);
  }

  handleChange(evt) {
    const { onChange } = this.props;
    const value = evt.target.files;
    onChange(evt, value);
  }

  handleFocus(evt) {
    const { onFocus } = this.props;
    this.setState({ focused: true });
    onFocus(evt);
  }

  simulateClick() {
    this.inputEl.current.click();
  }
}
Upload.propTypes = {
  /**
   * Primary text
   */
  primaryText: PropTypes.string,
  /**
   * Details including restrictions and upload constraints
   */
  secondaryText: PropTypes.string,
  /**
   * If true the user can not upload files
   */
  disabled: PropTypes.bool,
  /**
   * Name of file to upload
   */
  name: PropTypes.string,
  /**
   * Function executed when uploading state is changing.
   */
  onChange: PropTypes.func,
  /**
   * Indicates the page focus is this text field.
   */
  focused: PropTypes.bool,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * keydown event handler.
   */
  onKeyDown: PropTypes.func,
  /**
   * Callback providing the ref of the input field.
   */
  innerRef: PropTypes.func,
  /**
   * Indicates the tab order within the document.
   */
  tabIndex: PropTypes.string,
  /**
   * Variants of upload inputs
   */
  variant: PropTypes.oneOf(['button', 'dropzone']),
  /**
   * If `true` multiple files can be uploaded
   */
  multiple: PropTypes.bool,
  /**
   * Accept
   */
  accept: PropTypes.string,
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Intial value of the contorl
   */
  defaultValue: PropTypes.object,
};

Upload.defaultProps = {
  primaryText: '',
  secondaryText: '',
  name: 'file',
  accept: '',
  disabled: false,
  focused: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  onKeyDown: noop,
  innerRef: noop,
  tabIndex: '0',
  multiple: false,
};

export { Upload };
