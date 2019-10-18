import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { Focusable } from '../Focusable';
import { Hoverable } from '../Hoverable';

const calculateDropdownDimensions = (
  inputDimensions,
  viewportHeight,
  maxHeight,
) => {
  const remainingHeightBelowInput = viewportHeight - inputDimensions.bottom;
  const remainingHeightAboveInput = viewportHeight - inputDimensions.top;

  const remainingHeight =
    remainingHeightBelowInput >= 0
      ? remainingHeightBelowInput
      : remainingHeightAboveInput;

  const halfOfScreen = viewportHeight * 0.5;

  const height = Math.min(remainingHeight, halfOfScreen, maxHeight);

  const width = inputDimensions.width;

  return {
    height,
    width,
  };
};

class WithFormFieldState extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      dropdownMaxHeight: props.dropdownMaxHeight,
      dropdownWidth: props.dropdownWidth,
    };
    this.inputContainer = React.createRef();
    this.calculateDropdownDimensions = this.calculateDropdownDimensions.bind(
      this,
    );
  }

  calculateDropdownDimensions() {
    // If the ref is not available or this is not run in a broswer bail
    if (!this.inputContainer.current || typeof window === 'undefined') {
      return;
    }

    const maxHeight =
      this.props.dropdownMaxHeight >= 0 ? this.props.dropdownMaxHeight : 500;

    const inputDimensions = this.inputContainer.current.getBoundingClientRect();
    const viewportHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight || 0,
    );

    const { height, width } = calculateDropdownDimensions(
      inputDimensions,
      viewportHeight,
      maxHeight,
    );

    this.setState({
      dropdownMaxHeight: `${height}px`,
      dropdownWidth: `${width}px`,
    });
  }

  render() {
    const { children, focused, onBlur, onFocus } = this.props;
    const { dropdownMaxHeight, dropdownWidth } = this.state;
    return (
      <Hoverable>
        {({ bind: { onMouseEnter, onMouseLeave }, hovered }) => (
          <Focusable focused={focused} onBlur={onBlur} onFocus={onFocus}>
            {({ focused, bind: bindFocusable, ref }) =>
              children({
                dropdownMaxHeight,
                dropdownWidth,
                onBlur: bindFocusable.onBlur,
                onFocus: bindFocusable.onFocus,
                calculateDropdownDimensions: this.calculateDropdownDimensions,
                focused,
                onMouseEnter,
                onMouseLeave,
                hovered,
                inputContainerRef: this.inputContainer,
                inputRef: ref,
              })
            }
          </Focusable>
        )}
      </Hoverable>
    );
  }
}

WithFormFieldState.propTypes = {
  /**
   * If true the form field is editable inline and does not require a save button on a form
   */
  inlineEdit: PropTypes.bool,
  /**
   * If true the FormField is focused
   */
  focused: PropTypes.bool,
  /**
   * If true the FormField is hovered
   */
  hovered: PropTypes.bool,
  /**
   * Max height of the dropdown's height
   */
  dropdownMaxHeight: PropTypes.number,
  /**
   * dropdown's width
   */
  dropdownWidth: PropTypes.string,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
  /**
   * Render prop
   */
  children: PropTypes.func,
};

WithFormFieldState.defaultProps = {
  inlineEdit: false,
  focused: false,
  hovered: false,
  dropdownMaxHeight: null,
  dropdownWidth: null,
  onFocus: noop,
  onBlur: noop,
};

export default WithFormFieldState;
