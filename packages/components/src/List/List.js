import PropTypes from 'prop-types';
import React, { Children, cloneElement, Fragment } from 'react';
import { findLastIndex } from 'underscore';
import { StyleProvider } from '../StyleProvider';
import { Divider } from '../Divider';
import ListContext from './ListValueContext';

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      focusedIndex: -1,
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const { bordered, dense, children } = this.props;

    const childrenCount = Children.count(children) - 1;
    const items = Children.map(children, (child, i) => {
      const clone = cloneElement(child, {
        focused: child.props.focused || this.state.focusedIndex === i,
        key: child.props.id || i,
        index: i,
        onKeyDown: (evt, listItem) => {
          this.handleKeyDown(evt, listItem);
          child.props.onKeyDown(evt);
        },
      });
      if (!bordered) {
        return clone;
      }
      const divider = i < childrenCount ? <Divider /> : null;

      return (
        <Fragment>
          {clone}
          {divider}
        </Fragment>
      );
    });

    return (
      <StyleProvider>
        <div
          data-component="List"
          data-test={this.props['data-test']}
          role="list"
        >
          <ListContext.Provider value={{ dense }}>{items}</ListContext.Provider>
        </div>
      </StyleProvider>
    );
  }

  handleKeyDown(evt, listItem) {
    const isSelection = evt.key === 'Enter' || evt.key === ' ';
    if (evt.key === 'Tab' || isSelection) {
      if (isSelection) {
        evt.preventDefault();
        listItem.props.onClick(evt);
      }
      this.setState({ focusedIndex: -1 });
    } else if (evt.key === 'ArrowUp') {
      evt.preventDefault();

      const hasPrimaryActionByIndex = React.Children.map(
        this.props.children,
        child => Boolean(child.props.onClick),
      );

      const currentIndex = listItem.props.index;
      const max = hasPrimaryActionByIndex.length;

      const focusedIndex = (() => {
        const start = currentIndex - 1 < 0 ? max - 1 : currentIndex - 1;
        for (var i = start; i >= 0; i--) {
          if (hasPrimaryActionByIndex[i]) {
            return i;
          }
        }

        for (var i = max; i >= start; i--) {
          if (hasPrimaryActionByIndex[i]) {
            return i;
          }
        }

        return -1;
      })();

      this.setState({
        focusedIndex,
      });
    } else if (evt.key === 'ArrowDown') {
      evt.preventDefault();

      const hasPrimaryActionByIndex = React.Children.map(
        this.props.children,
        child => Boolean(child.props.onClick),
      );

      const currentIndex = listItem.props.index;
      const max = hasPrimaryActionByIndex.length;

      const focusedIndex = (() => {
        const start = currentIndex + 1 >= max ? 0 : currentIndex + 1;
        for (var i = start; i < max; i++) {
          if (hasPrimaryActionByIndex[i]) {
            return i;
          }
        }

        for (var i = 0; i <= currentIndex; i++) {
          if (hasPrimaryActionByIndex[i]) {
            return i;
          }
        }

        return -1;
      })();

      this.setState({
        focusedIndex,
      });
    } else if (evt.key === 'Home') {
      evt.preventDefault();

      const hasPrimaryActionByIndex = React.Children.map(
        this.props.children,
        child => Boolean(child.props.onClick),
      );

      const focusedIndex = hasPrimaryActionByIndex.findIndex(
        hasPrimaryAction => hasPrimaryAction,
      );

      this.setState({
        focusedIndex,
      });
    } else if (evt.key === 'End') {
      evt.preventDefault();

      const hasPrimaryActionByIndex = React.Children.map(
        this.props.children,
        child => Boolean(child.props.onClick),
      );

      const focusedIndex = findLastIndex(
        hasPrimaryActionByIndex,
        hasPrimaryAction => hasPrimaryAction,
      );

      this.setState({
        focusedIndex,
      });
    }
  }
}

List.propTypes = {
  /**
   * If true Dividers will be placed between each ListItem
   */
  bordered: PropTypes.bool,
  /**
   * Collection of ListItems
   */
  children: PropTypes.node,
  /**
   * Reduce the whitespace surrounding list items' content
   */
  dense: PropTypes.bool,
};

List.defaultProps = {
  bordered: false,
  dense: false,
};

export default List;
