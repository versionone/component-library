import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'underscore';
import copy from 'copy-to-clipboard';

export class CopyToClipboard extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
  }
  onClick(event) {
    const { text, onCopy, children, message } = this.props;

    const elem = React.Children.only(children);

    const result = copy(text, {
      debug: false,
      message,
    });

    if (isFunction(onCopy)) {
      onCopy(text, result);
    }

    if (elem && elem.props && typeof isFunction(elem.props.onClick)) {
      elem.props.onClick(event);
    }
  }

  render() {
    const {
      text: _text,
      onCopy: _onCopy,
      options: _options,
      children,
      ...props
    } = this.props;

    const elem = React.Children.only(children);

    return React.cloneElement(elem, { ...props, onClick: this.onClick });
  }
}

CopyToClipboard.propTypes = {
  /**
   * Text to copy
   */
  text: PropTypes.string.isRequired,
  /**
   * Target of the click event
   */
  children: PropTypes.element.isRequired,
  /**
   * Callback function after the text has been copied
   */
  onCopy: PropTypes.func,
  /**
   * Message to display in prompt if execCommand is not supported
   * #{key} is replaced with ⌘+C or Ctrl+C apprioriately
   */
  message: PropTypes.string,
};

CopyToClipboard.defaultProps = {
  onCopy: undefined,
  message: 'Copy to clipboard: #{key}, Enter',
};

export default CopyToClipboard;
