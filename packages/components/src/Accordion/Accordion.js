import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { noop } from 'underscore';
import Item from './Item';
import { createComponent, StyleProvider } from '../StyleProvider';
import { Border } from '../Border';

const DefinitionList = createComponent(
  () => ({
    margin: 0,
  }),
  'dl',
  ['role'],
);

class Accordion extends Component {
  constructor() {
    super();
    this.state = { focusedIndex: -1 };

    this.toggle = this.toggle.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress, false);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress, false);
  }

  static getDerivedStateFromProps(props, state) {
    if (state.focusedIndex >= 0) {
      return null;
    }
    const focusedIndex = React.Children.toArray(props.children).findIndex(
      child => child.props.focused,
    );
    return {
      focusedIndex,
    };
  }

  handleKeyPress(event) {
    const { children } = this.props;
    const { focusedIndex } = this.state;

    if (focusedIndex === -1) return;

    const isUp = event.which === 38;
    const isDown = event.which === 40;

    const isHome = event.which === 36;
    const isEnd = event.which === 35;

    const isArrowKey = isUp || isDown || isHome || isEnd;

    if (!isArrowKey) return;

    // Prevent Home, End, and Arrow keys from moving the scrollbar
    event.preventDefault();

    const count = React.Children.count(children);
    const max = count - 1;
    const min = 0;
    const index = parseInt(focusedIndex, 10);
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

    if (isUp) this.handleFocus(getPrevious());
    if (isDown) this.handleFocus(getNext());
    if (isHome) this.handleFocus(getFirst());
    else this.handleFocus(getLast());
  }

  toggle(index) {
    const { onSelect } = this.props;
    this.setState({
      focusedIndex: index,
    });

    onSelect(index);
  }

  handleFocus(index) {
    this.setState({
      focusedIndex: index,
    });
  }

  handleBlur() {
    this.setState({
      focusedIndex: -1,
    });
  }

  render() {
    const { focusedIndex } = this.state;
    const {
      children,
      disableDividers,
      disableBorder,
      'data-test': dataTest,
    } = this.props;

    const count = React.Children.count(children) - 1;

    const items = React.Children.map(children, (child, index) => {
      const childProps = {
        key: index,
        accoridionId: `accordionId-${index + 1}`,
        isLast: index === count,
        isFirst: index === 0,
        focusedIndex,
        focused: focusedIndex === index,
        status: child.props.status,
        handleSelection: () => this.toggle(index),
        handleFocus: () => this.handleFocus(index),
        handleBlur: this.handleBlur,
        disableDividers,
      };

      return React.cloneElement(child, childProps);
    });

    const definitionList = (
      <DefinitionList role="presentation">{items}</DefinitionList>
    );

    const borderedChilden = disableBorder ? (
      definitionList
    ) : (
      <Border radius={8}>{definitionList}</Border>
    );

    return (
      <StyleProvider>
        <span data-component="Accordion" data-test={dataTest}>
          {borderedChilden}
        </span>
      </StyleProvider>
    );
  }
}

Accordion.propTypes = {
  /** Accordion items. */
  children: PropTypes.instanceOf(Item),
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * If true do not render a border
   */
  disableBorder: PropTypes.bool,
  /**
   * If true do not render dividers
   */
  disableDividers: PropTypes.bool,
  /**
   * Function called when a selection is made
   */
  onSelect: PropTypes.func,
};

Accordion.defaultProps = {
  disableBorder: false,
  disableDividers: false,
  onSelect: noop,
};

export { Accordion };
