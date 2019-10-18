import PropTypes from 'prop-types';
import React from 'react';
import { isFunction, noop } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { Focusable } from '../Focusable';
import { HoverIntersection } from '../HoverIntersection';
import ListContext from './ListValueContext';
import { palette } from '../palette';
import { AncillaryAction } from './AncillaryAction';

const Row = createComponent(
  ({ dense, hovered, selected, theme }) => {
    const backgroundColor = (() => {
      if (hovered) return theme.ListItem.mainHighlight;
      if (selected) return theme.ListItem.selected;
      return palette.transparent;
    })();

    return {
      display: 'flex',
      'flex-direction': 'row',
      flexWrap: 'nowrap',
      'justify-content': 'space-between',
      'align-items': 'center',
      ...styleUtils.conditionalStyles(dense, styleUtils.padding(2)),
      ...styleUtils.conditionalStyles(!dense, styleUtils.padding(10)),
      cursor: 'pointer',
      'background-color': backgroundColor,
    };
  },
  'div',
  ['data-component', 'data-test', 'role', 'id', 'onMouseEnter', 'onMouseLeave'],
);

const ClickableRow = createComponent(
  ({ dense, focused, hovered, selected, theme }) => {
    const backgroundColor = (() => {
      if (hovered) return theme.ListItem.mainHighlight;
      if (selected) return theme.ListItem.selected;
      return palette.transparent;
    })();

    return {
      display: 'flex',
      'flex-direction': 'row',
      flexWrap: 'nowrap',
      'justify-content': 'space-between',
      'align-items': 'center',
      ...styleUtils.conditionalStyles(dense, styleUtils.padding(2)),
      ...styleUtils.conditionalStyles(!dense, styleUtils.padding(10)),
      border: 0,
      boxSizing: 'border-box',
      cursor: 'pointer',
      textAlign: 'left',
      width: '100%',
      'background-color': backgroundColor,
      ...styleUtils.conditionalStyles(focused, theme.focused),
    };
  },
  'div',
  [
    'role',
    'data-component',
    'data-test',
    'data-trackingid',
    'id',
    'onBlur',
    'onClick',
    'onFocus',
    'onKeyDown',
    'onMouseDown',
    'onMouseEnter',
    'onMouseLeave',
    'onMouseMove',
    'tabIndex',
  ],
);

const LeftGroup = createComponent(
  () => ({
    alignItems: 'center',
    display: 'flex',
    overflow: 'hidden',
    '> *': {
      ...styleUtils.margin(8),
    },
  }),
  'div',
);

class ListItem extends React.Component {
  constructor() {
    super();

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  render() {
    const {
      'data-test': dataTest,
      'data-trackingid': trackingId,
      children,
      focused,
      onClick,
      onFocus,
      onBlur,
      onMouseDown,
      onMouseEnter,
      onMouseLeave,
      onMouseMove,
      secondaryAction,
      supportingVisual,
      isPreviousSelection,
      tabIndex,
    } = this.props;

    const listItemText = isPreviousSelection
      ? React.cloneElement(children, {
          emphasize: isPreviousSelection,
        })
      : children;

    return (
      <ListContext.Consumer>
        {({ dense }) => {
          const RowImpl = isFunction(onClick) ? ClickableRow : Row;

          return (
            <Focusable focused={focused} onBlur={onBlur} onFocus={onFocus}>
              {({ focused: isFocused, bind: bindFocusable, ref }) => (
                <HoverIntersection>
                  {({ bind, hovered }) => (
                    <RowImpl
                      onMouseDown={onMouseDown}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      onMouseMove={onMouseMove}
                      tabIndex={tabIndex}
                      {...bind}
                      {...bindFocusable}
                      data-test={dataTest}
                      data-trackingid={trackingId}
                      role="listitem"
                      data-component="ListItem"
                      dense={dense}
                      focused={isFocused}
                      hovered={hovered}
                      innerRef={ref}
                      onClick={onClick}
                      onKeyDown={this.handleKeyDown}
                    >
                      <LeftGroup>
                        {Boolean(supportingVisual) && (
                          <AncillaryAction>{supportingVisual}</AncillaryAction>
                        )}
                        {listItemText}
                      </LeftGroup>
                      {Boolean(secondaryAction) && (
                        <AncillaryAction>{secondaryAction}</AncillaryAction>
                      )}
                    </RowImpl>
                  )}
                </HoverIntersection>
              )}
            </Focusable>
          );
        }}
      </ListContext.Consumer>
    );
  }

  handleKeyDown(evt) {
    const { onKeyDown } = this.props;
    onKeyDown(evt, this);
  }
}

ListItem.propTypes = {
  /**
   * children
   */
  children: PropTypes.node,
  /** indicates the list item is focused */
  focused: PropTypes.bool,
  /**
   * blur handler
   */
  onBlur: PropTypes.func,
  /**
   * focus handler
   */
  onFocus: PropTypes.func,
  /**
   * mouse down handler
   */
  onMouseDown: PropTypes.func,
  /**
   * mouse enter handler
   */
  onMouseEnter: PropTypes.func,
  /**
   * mouse leave handler
   */
  onMouseLeave: PropTypes.func,
  /**
   * mouse move handler
   */
  onMouseMove: PropTypes.func,
  /**
   * handle the primary action
   */
  onClick: PropTypes.func,
  /** when focused, event handler is invoked when a keydown event is triggered */
  onKeyDown: PropTypes.func,
  /**
   * selected list item
   */
  selected: PropTypes.bool,
  /**
   * single, ancillary action that can be taken on an item
   */
  secondaryAction: PropTypes.node,
  /**
   * item on left of text
   */
  supportingVisual: PropTypes.node,
  /**
   * TabIndex if the row has a primary action,
   */
  tabIndex: PropTypes.string,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
  /**
   * Reserved for List used withing Single and MultiSelection options rendering
   */
  isPreviousSelection: PropTypes.bool,
};

ListItem.defaultProps = {
  focused: false,
  onClick: null,
  onKeyDown: noop,
  selected: false,
  secondaryAction: null,
  supportingVisual: null,
  tabIndex: '0',
  isPreviousSelection: false,
  onFocus: noop,
  onBlur: noop,
  onMouseDown: noop,
  onMouseEnter: noop,
  onMouseLeave: noop,
  onMouseMove: noop,
};

export default ListItem;
