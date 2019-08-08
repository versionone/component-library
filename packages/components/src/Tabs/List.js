import PropTypes from 'prop-types';
import React from 'react';
import { isNull, isUndefined } from 'underscore';
import TabContext from './TabContext';

class SmartList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { focused: false };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress, false);
  }

  handleKeyPress(event) {
    const { activeTab, focusedTab, children, selectTabByIndex } = this.props;

    const isInActive =
      isNull(activeTab) ||
      isUndefined(activeTab) ||
      isNull(focusedTab) ||
      isUndefined(focusedTab);

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
    const index = parseInt(activeTab);
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

    const handleSelection = selectTabByIndex(newIndex);
    handleSelection(event);
  }

  render() {
    const {props} = this;
    const count = React.Children.count(props.children);
    return React.Children.map(props.children, (child, index) => {
      const isSelected = parseInt(props.activeTab) === index;
      const isFocused = parseInt(props.focusedTab) === index;

      const tabProps = {
        key: index,
        id: `${index  }`,
        controls: `${index}-tab`,
        selected: isSelected,
        handleSelection: props.selectTabByIndex(index),
        selectTabByIndex: props.selectTabByIndex,
        handleFocus: props.focusTabByIndex(index),
        handleBlur: props.focusTabByIndex(null),
        focused: isFocused,
        tabIndex: isSelected ? '0' : '-1',
        count,
      };

      return React.cloneElement(child, tabProps);
    });
  }
}

SmartList.propTypes = {
  // Comes from TabContext.Consumer
  // Children come from List
};

const List = props => {
  return (
    <span
      role="tablist"
      data-component="Tabs.List"
      data-test={props['data-test']}
    >
      <TabContext.Consumer>
        {value => <SmartList {...value}>{props.children}</SmartList>}
      </TabContext.Consumer>
    </span>
  );
};

List.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Collection of Tab instances
   */
  children: PropTypes.node,
};

export default List;
