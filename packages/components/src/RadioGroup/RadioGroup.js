import PropTypes from 'prop-types';
import React from 'react';
import { isNull, isUndefined } from 'underscore';
import { noop } from 'rxjs';

class SmartGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      activeRadio: props.defaultActiveRadio,
      focusedRadio: props.defaultFocusedRadio, 
      selectRadioByIndex: index => () => {
        this.setState({
          activeRadio: index,
          focusedRadio: index,
        });
      },
      focusRadioByIndex: index => () => this.setState({ focusedRadio: index }),
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event) {
    const { activeRadio, focusedRadio, selectRadioByIndex } = this.state;
    const { children } = this.props;

    const isInActive =
      isNull(activeRadio) ||
      isUndefined(activeRadio) ||
      isNull(focusedRadio) ||
      isUndefined(focusedRadio);

    if (isInActive) return;

    const isLeft = event.which === 37;
    const isRight = event.which === 39;

    const isHome = event.which === 36;
    const isEnd = event.which === 35;

    const isArrowKey = isLeft || isRight || isHome || isEnd;

    if (!isArrowKey) return;

    // Prevent Home, End, and Arrow keys from moving the scrollbar
    event.preventDefault();

    const count = React.Children.count(children);
    const max = count - 1;
    const min = 0;
    const index = parseInt(activeRadio);
    const one = 1;

    const linkedList = React.Children.map(children, (child, i) => {
      return {
        i,
        disabled: Boolean(child.props.disabled),
        next: i + one > max ? min : i + one,
        previous: i - one < min ? max : i - one,
      };
    });

    const find = (start, direction) => () => {
      let i = 0;
      let item = start;
      while (i < count) {
        i++;
        const next = linkedList[item][direction];
        if (linkedList[next].disabled) item = next;
        else return next;
      }
      return start;
    };

    const getNext = find(index, 'next');
    const getPrevious = find(index, 'previous');
    const getFirst = find(max, 'next');
    const getLast = find(min, 'previous');

    const newIndex = isLeft
      ? getPrevious()
      : isRight
      ? getNext()
      : isHome
      ? getFirst()
      : getLast();

    const handleSelection = selectRadioByIndex(newIndex);
    handleSelection(event);
  }

  render() {
    const {props} = this;
    const count = React.Children.count(props.children);
    
    return React.Children.map(props.children, (child, index) => {
      const isSelected = parseInt(this.state.activeRadio) === index;
      const isFocused = parseInt(this.state.focusedRadio) === index;

      const radioProps = {
        key: index,
        id: `${index  }`,
        controls: `${index}-radio`,
        selected: isSelected,
        onClick: this.state.selectRadioByIndex(index),
        selectRadioByIndex: this.state.selectRadioByIndex,
        handleFocus: this.state.focusRadioByIndex(index),
        handleBlur: this.state.focusRadioByIndex(null),
        focused: isFocused,
        radioIndex: isSelected ? '0' : '-1',
        count,
      };

      return React.cloneElement(child, radioProps);
    });
  }
}

SmartGroup.propTypes = {
  // Comes from GroupContext.Consumer
  // Children come from List
};

const RadioGroup = props => {
  return (
    <span
      data-component="RadioGroup"
      data-test={props['data-test']}
    >
      <SmartGroup {...props}>{props.children}</SmartGroup>
    </span>
  );
};

RadioGroup.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Collection of Radio instances
   */
  children: PropTypes.node,
    /**
   * Index of the active radio before user interaction
   */
  defaultActiveRadio: PropTypes.number,
  /**
   * Index of the focused radio before user interaction
   */
  defaultFocusedRadio: PropTypes.number,
  /**
   * Function called when a radio is clicked
   */
  handleSelection: PropTypes.func,
};

RadioGroup.defaultProps = {
  defaultActiveRadio: 0,
  defaultFocusedRadio: null,
  handleSelection: noop,
};

export { RadioGroup };
