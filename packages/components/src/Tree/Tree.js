import { noop, isFunction } from 'underscore';
import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { createComponent, styleUtils } from '../StyleProvider';
import { Arrow } from '../Arrow';
import { SpacedGroup } from '../SpacedGroup';
import { palette } from '../palette';
import { Typography } from '../Typography';

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
  const {
    children,
    'data-test': dataTest,
    depth,
    expanded,
    handleSelection,
    selected,
    title,
    handleExpand,
  } = props;

  const updatedDepth = depth || 0;
  const hasChildren = Children.count(children);

  const arrow = hasChildren ? (
    <Arrow
      open={expanded}
      onClick={event => {
        event.stopPropagation();
        handleExpand(event);
      }}
    />
  ) : (
    <ArrowPlaceholder />
  );

  const updatedChildren = Children.map(children, (child, i) => {
    return React.cloneElement(child, {
      key: i,
      depth: updatedDepth + 1,
    });
  });

  const NodeImpl = isFunction(handleSelection) ? ClickableNode : Leaf;

  return (
    <span data-component="Tree" data-test={dataTest} depth={updatedDepth}>
      <SpacedGroup xs={2}>
        <LeftSpacer depth={updatedDepth} />
        <NodeImpl selected={selected} onClick={handleSelection} tabIndex="0">
          {arrow}
          <Typography>{title}</Typography>
        </NodeImpl>
      </SpacedGroup>
      {updatedChildren}
    </span>
  );
};

Tree.propTypes = {
  children: PropTypes.node,
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
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
  /**
   * Reserved for parent Tree to inform child of level of nesting
   */
  depth: PropTypes.number,
};

Tree.defaultProps = {
  selected: false,
  expanded: false,
  handleSelection: null,
  handleExpand: noop,
  title: '',
  depth: 0,
};

export { Tree };
