import { noop, isFunction } from 'underscore';
import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';
import Arrow from '../Arrow';
import SpacedGroup from '../SpacedGroup';
import { palette } from '../palette';

const ArrowPlaceholder = createComponent(() => ({ height: 28 }), 'div');

const LeftSpacer = createComponent(
  ({ depth }) => ({
    width: depth * 40,
    minWidth: depth * 40,
  }),
  'div',
);

const buildStyles = ({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  color: '#05354E',
  borderRadius: 4,
  borderColor: palette.transparent,
  borderWidth: 1,
  borderStyle: 'solid',
  ':hover': {
    borderColor: '#07496b',
  },
  ...styleUtils.padding(0, 8, 0, 4),
  ...styleUtils.conditionalStyle(selected, 'background-color', '#D6EFFC'),
});

const Leaf = createComponent(buildStyles, 'div');

const ClickableNode = createComponent(
  ({ selected, theme }) => {
    return {
      ...buildStyles({ selected }),
      ':focus': {
        borderRadius: 4,
        ...theme.focused,
      },
    };
  },
  'button',
  ['onClick', 'tabIndex'],
);

const Tree = props => {
  const depth = props.depth || 0;
  const hasChildren = React.Children.count(props.children);

  const arrow = hasChildren ? (
    <Arrow
      open={props.expanded}
      onClick={event => {
        event.stopPropagation();
        props.handleExpand(event);
      }}
    />
  ) : (
    <ArrowPlaceholder />
  );

  const children = React.Children.map(props.children, (child, i) => {
    return React.cloneElement(child, {
      key: i,
      depth: depth + 1,
    });
  });

  const NodeImpl = isFunction(props.handleSelection) ? ClickableNode : Leaf;

  return (
    <StyleProvider>
      <span data-component="Tree" data-test={props['data-test']} depth={depth}>
        <SpacedGroup xs={2}>
          <LeftSpacer depth={depth} />
          <NodeImpl
            selected={props.selected}
            onClick={props.handleSelection}
            tabIndex="0"
          >
            {arrow}
            <span>{props.title}</span>
          </NodeImpl>
        </SpacedGroup>
        {children}
      </span>
    </StyleProvider>
  );
};

Tree.propTypes = {
  /**
   * If true then the node is selected
   */
  selected: PropTypes.bool,
  /**
   * If true the node is expanded and it's children are visible
   */
  expanded: PropTypes.bool,
  /**
   * Function called when a node is selected
   */
  handleSelection: PropTypes.func,
  /**
   * FUnction called when a node is expanded
   */
  handleExpand: PropTypes.func,
  /**
   * Title of the node
   */
  title: PropTypes.node,
};

Tree.defaultProps = {
  selected: false,
  expanded: false,
  handleSelection: null,
  handleExpand: noop,
  title: '',
};

export default Tree;
