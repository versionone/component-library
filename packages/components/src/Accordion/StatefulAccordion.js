import PropTypes from 'prop-types';
import React from 'react';
import { isEmpty, noop } from 'underscore';
import Accordion from './Accordion';

class StatefulAccordion extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpenByIndex: {},
    };

    this.toggle = this.toggle.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEmpty(Object.keys(state.isOpenByIndex))) {
      return null;
    }
    const firstOpenIndex = React.Children.toArray(props.children).findIndex(
      child => child.props.open,
    );
    const isOpenByIndex = React.Children.toArray(props.children).reduce(
      (acc, child, index) => {
        const isOpen = (() => {
          if (!props.manyExpandable) {
            return Boolean(child.props.open);
          }
          return props.manyExpandable && firstOpenIndex === index;
        })();
        return {
          ...acc,
          [index]: isOpen,
        };
      },
      {},
    );
    return { isOpenByIndex };
  }

  toggle(index) {
    const isOpen = this.state.isOpenByIndex[index];
    const isClosing = isOpen;

    let finalOpenState = {};

    const newOpenState = {
      ...this.state.isOpenByIndex,
      [index]: !isOpen,
    };

    const willAllBeClosed = Object.values(newOpenState).every(x => !x);

    finalOpenState = newOpenState;

    if (!this.props.allCollapsable && willAllBeClosed) {
      finalOpenState = this.state.isOpenByIndex;
    }

    if (!this.props.manyExpandable && !isClosing) {
      finalOpenState = Object.keys(newOpenState).reduce(
        (acc, _, i) => ({
          ...acc,
          [i]: false,
        }),
        {},
      );
      finalOpenState[index] = true;
    }

    this.setState({
      isOpenByIndex: finalOpenState,
    });

    this.props.onSelect(index);
  }

  render() {
    const accordion = <Accordion {...this.props} onSelect={this.toggle} />;

    const clonedChildren = React.Children.map(
      accordion.props.children,
      (child, index) => {
        return React.cloneElement(child, {
          open: this.state.isOpenByIndex[index],
        });
      },
    );

    return React.cloneElement(accordion, {
      children: clonedChildren,
    });
  }
}

StatefulAccordion.propTypes = {
  /**
   * If true all panels can be closed
   */
  allCollapsable: PropTypes.bool,
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
   * If true many panels can be open
   */
  manyExpandable: PropTypes.bool,
  /**
   * Function called when a selection is made
   */
  onSelect: PropTypes.func,
};

StatefulAccordion.defaultProps = {
  allCollapsable: false,
  disableBorder: false,
  disableDividers: false,
  manyExpandable: false,
  onSelect: noop,
};

export default StatefulAccordion;
