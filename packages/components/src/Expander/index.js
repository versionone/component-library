import { noop } from 'underscore';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import Arrow from '../Arrow';
import SpacedGroup from '../SpacedGroup';
import { palette } from '../palette';

const Header = createComponent(
  ({ theme }) => ({
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    background: 'transparent',
    cursor: 'pointer',
    border: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.08)',
    ':focus': {
      ...theme.focused,
    },
  }),
  'button',
  ['onClick', 'onKeyDown', 'onKeyUp', 'aria-expanded', 'tabIndex'],
);

const Container = createComponent(
  ({ open }) => ({
    transition: '0.5s height linear',
    overflow: 'hidden',
    ...styleUtils.conditionalStyle(open, 'height', 'auto', '0px'),
  }),
  'div',
);

const Expander = props => {
  const title = props.expanded ? props.expandedTitle : props.title;

  return (
    <StyleProvider>
      <div data-component="Expander" data-test={props['data-test']}>
        <Header
          aria-expanded={props.expanded}
          tabIndex="0"
          onClick={props.onToggle}
        >
          <SpacedGroup center xs={2}>
            <Arrow open={props.expanded} is="span" />
            <span>{title}</span>
          </SpacedGroup>
        </Header>
        <Container open={props.expanded}>{props.children}</Container>
      </div>
    </StyleProvider>
  );
};

Expander.propTypes = {
  /**
   * If true the content is visible
   */
  expanded: PropTypes.bool,
  /**
   * Title of the collapsable section when its collapsed
   */
  title: PropTypes.string,
  /**
   * Title of the collapsable section when its expanded
   */
  expandedTitle: PropTypes.string,
  /**
   * Content that can be expanded or collapsed
   */
  children: PropTypes.node,
  /**
   * Function called when toggling expansion
   */
  onToggle: PropTypes.func,
};

Expander.defaultProps = {
  expanded: false,
  title: 'Expand',
  expandedTitle: 'Collapse',
  onToggle: noop,
};

export default Expander;
