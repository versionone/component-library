import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { isFunction, noop } from 'underscore';
import ListContext from './ListValueContext';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { EventBoundary } from '../EventBoundary';
import { Focusable } from '../Focusable';
import { HoverIntersection } from '../HoverIntersection';
import { WithBreakpoint } from '../WithBreakpoint';

const Row = createComponent(
  ({ dense, hovered, selected, theme }) => ({
    display: 'flex',
    'flex-direction': 'row',
    flexWrap: 'nowrap',
    'justify-content': 'space-between',
    'align-items': 'center',
    ...styleUtils.conditionalStyles(dense, styleUtils.padding(2)),
    ...styleUtils.conditionalStyles(!dense, styleUtils.padding(10)),
    cursor: 'pointer',
    'background-color':
      !hovered && selected
        ? theme.ListItem.selected
        : hovered
        ? theme.ListItem.mainHighlight
        : 'transparent',
  }),
  'div',
  [
    'data-component',
    'data-test',
    'role',
    'aria-selected',
    'id',
    'onMouseEnter',
    'onMouseLeave',
    'role',
  ],
);

const ClickableRow = createComponent(
  ({ dense, focused, hovered, selected, theme }) => ({
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
    'background-color':
      !hovered && selected
        ? theme.ListItem.selected
        : hovered
        ? theme.ListItem.mainHighlight
        : 'transparent',
    ...styleUtils.conditionalStyles(focused, theme.focused),
  }),
  'div',
  [
    'role',
    'aria-selected',
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
    'role',
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

const AncillaryAction = ({ children }) => (
  <EventBoundary onClick={noop} onFocus={noop} onKeyDown={noop}>
    {({ onClick, onFocus, onKeyDown }) => (
      <HoverIntersection.Exclude>
        {({ bind, hovered }) => (
          <div
            {...bind}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          >
            {cloneElement(children, { hovered })}
          </div>
        )}
      </HoverIntersection.Exclude>
    )}
  </EventBoundary>
);

class ListItemImpl extends React.Component {
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
      index,
      onClick,
      onFocus,
      onBlur,
      onKeyDown,
      secondaryAction,
      supportingVisual,
      ...otherProps
    } = this.props;

    return (
      <StyleProvider>
        <ListContext.Consumer>
          {({ dense }) => {
            const RowImpl = isFunction(onClick) ? ClickableRow : Row;

            return (
              <Focusable focused={focused} onBlur={onBlur} onFocus={onFocus}>
                {({ focused: isFocused, bind: bindFocusable, ref }) => (
                  <HoverIntersection>
                    {({ bind, hovered }) => (
                      <RowImpl
                        {...otherProps}
                        {...bind}
                        {...bindFocusable}
                        data-test={dataTest}
                        data-trackingid={trackingId}
                        role="listitem"
                        data-component="List.Item"
                        dense={dense}
                        focused={isFocused}
                        hovered={hovered}
                        innerRef={ref}
                        onClick={onClick}
                        onKeyDown={this.handleKeyDown}
                      >
                        <LeftGroup>
                          {Boolean(supportingVisual) && (
                            <AncillaryAction>
                              {supportingVisual}
                            </AncillaryAction>
                          )}
                          {children}
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
      </StyleProvider>
    );
  }

  handleKeyDown(evt) {
    this.props.onKeyDown(evt, this);
  }
}

const ListItem = props => (
  <StyleProvider>
    <WithBreakpoint>
      {breakpoint => <ListItemImpl {...props} breakpoint={breakpoint} />}
    </WithBreakpoint>
  </StyleProvider>
);

ListItem.propTypes = {
  /**
   * children
   */
  children: PropTypes.node,
  /** indicates the list item is focused */
  focused: PropTypes.bool,
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
};

ListItem.defaultProps = {
  focused: false,
  onClick: null,
  onKeyDown: noop,
  selected: false,
  secondaryAction: null,
  supportingVisual: null,
  tabIndex: '0',
};

export default ListItem;
