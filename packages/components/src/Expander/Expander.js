import { noop } from 'underscore';
import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { Arrow } from '../Arrow';
import { SpacedGroup } from '../SpacedGroup';

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
  [
    'onClick',
    'onKeyDown',
    'onKeyUp',
    'aria-expanded',
    'tabIndex',
    'data-trackingid',
  ],
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
  const {
    expanded,
    expandedTitle,
    title,
    'data-test': dataTest,
    'data-trackingid': dataTrackingid,
    onToggle,
    children,
  } = props;
  const text = expanded ? expandedTitle : title;

  return (
    <div data-component="Expander" data-test={dataTest}>
      <Header
        aria-expanded={expanded}
        tabIndex="0"
        onClick={onToggle}
        data-trackingid={dataTrackingid}
      >
        <SpacedGroup center xs={2}>
          <Arrow open={expanded} is="span" />
          <span>{text}</span>
        </SpacedGroup>
      </Header>
      <Container open={expanded}>{children}</Container>
    </div>
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
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};

Expander.defaultProps = {
  expanded: false,
  title: 'Expand',
  expandedTitle: 'Collapse',
  onToggle: noop,
};

export { Expander };
