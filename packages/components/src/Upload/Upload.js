import React, { Fragment, Component, createRef } from 'react';
import { noop } from 'underscore';
import { PropTypes } from 'prop-types';
import { UploadIcon } from '@versionone/icons';
import {
  createComponent,
  StyleProvider,
  styleUtils,
  WithTheme,
} from '../StyleProvider';
import { Button } from '../Button';

const Root = createComponent(
  ({ width, height }) => ({
    ...styleUtils.conditionalStyle(width, 'width', width),
    ...styleUtils.conditionalStyle(height, 'height', height),
  }),
  'span',
  ['data-component', 'data-test'],
);

const InputFieldContainer = createComponent(
  ({ disabled, focused, theme }) => ({
    'background-color': theme.Upload.main,
    borderWidth: '1px',
    borderStyle: 'dashed',
    ...styleUtils.conditionalStyle(
      focused,
      'border-color',
      theme.Form.focused.main,
    ),
    ...styleUtils.conditionalStyle(
      disabled,
      'border-color',
      theme.Form.disabled.main,
    ),
    ':hover': {
      ...styleUtils.conditionalStyle(
        !disabled,
        'border-color',
        theme.Form.focused.main,
      ),
    },
    ...styleUtils.conditionalStyle(
      focused,
      'box-shadow',
      theme.focused.boxShadow,
    ),
    ...styleUtils.conditionalStyle(focused, 'outline', 'none', 'inherit'),
    borderRadius: 6,
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    '> *': {
      height: '100%',
      'margin-top': 8,
      'margin-bottom': 8,
    },
  }),
  'div',
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

const DropZoneLarge = props => {
  const {
    primaryText,
    secondaryText,
    children,
    disabled,
    focused,
    theme,
  } = props;

  return (
    <InputFieldContainer
      disabled={disabled}
      focused={focused}
      color={theme.Upload.main}
    >
      <UploadIcon size={32} title="upload" color={theme.Upload.iconColor} />
      <span>{primaryText}</span>
      <span>{secondaryText}</span>
      {children}
    </InputFieldContainer>
  );
};

const DropZoneSmall = props => {
  const { children, disabled, focused, theme } = props;

  return (
    <InputFieldContainer
      disabled={disabled}
      focused={focused}
      color={theme.Upload.main}
    >
      <UploadIcon size={32} title="upload" color={theme.Upload.iconColor} />
      <span>Upload</span>
      {children}
    </InputFieldContainer>
  );
};

const UploadButton = props => (
  <Fragment>
    <Button onClick={props.onClick} disabled={props.disabled}>
      <UploadIcon />
      Upload
    </Button>
    {React.cloneElement(props.children, {
      tabIndex: -1,
    })}
  </Fragment>
);

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      hovered: false,
    };
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.simulateClick = this.simulateClick.bind(this);
    this.inputEl = createRef();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      value: props.value,
    };
  }

  componentDidMount() {
    if (this.state.focused) {
      this.inputEl.current.focus();
    }
    this.props.innerRef(this.inputEl);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.focused && this.state.focused) {
      this.inputEl.current.focus();
    }
  }

  render() {
    const Component =
      this.props.variant === 'button'
        ? UploadButton
        : this.props.primaryText
        ? DropZoneLarge
        : DropZoneSmall;

    const dimensions =
      this.props.variant === 'button'
        ? {}
        : this.props.primaryText
        ? { width: 320, height: 200 }
        : { width: 100, height: 100 };

    const input = (
      <InputField
        type="file"
        accept={this.props.accept}
        multiple={this.props.multiple}
        innerRef={this.inputEl}
        tabIndex={this.props.tabIndex}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onFocus={this.handleFocus}
        disabled={this.props.disabled}
      />
    );

    const buildComponent = theme => {
      return (
        <label>
          <Component
            {...this.props}
            {...this.state}
            theme={theme}
            onClick={this.simulateClick}
          >
            {input}
          </Component>
        </label>
      );
    };

    return (
      <StyleProvider>
        <Root
          data-component="Upload"
          data-test={this.props['data-test']}
          {...dimensions}
        >
          <WithTheme>{buildComponent}</WithTheme>
        </Root>
      </StyleProvider>
    );
  }

  handleBlur(evt) {
    this.setState({ focused: false });
    this.props.onBlur(evt);
  }

  handleChange(evt) {
    const value = evt.target.files;
    this.props.onChange(evt, value);
  }

  handleFocus(evt) {
    this.setState({ focused: true });
    this.props.onFocus(evt);
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
   * If true the upload can accept multiple files
   */
  multi: PropTypes.bool,
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
  multi: false,
};

export { Upload };
