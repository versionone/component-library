import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { getComponentDisplayName } from '../utils';

const PseudoLink = createComponent(
  ({ selected, theme }) => ({
    display: 'flex',
    'align-items': 'center',
    ...styleUtils.conditionalStyle(selected, 'cursor', 'default', 'pointer'),
    ...styleUtils.conditionalStyle(
      selected,
      'color',
      theme.Breadcrumb.selected,
      theme.Breadcrumb.main,
    ),
    ':focus': {
      ...theme.focused,
    },
    ':hover': {
      ...styleUtils.conditionalStyle(
        !selected,
        'color',
        theme.Breadcrumb.mainHighlight,
      ),
    },
  }),
  'span',
  ['onClick'],
);

const Space = createComponent(
  () => ({
    display: 'inline-block',
    width: 4,
  }),
  'span',
);

const BreadcrumbItem = props => {
  const { icon, children, selected, onClick, collapse } = props;

  const positionedIcon = icon && (
    <Fragment>
      {React.createElement(icon, { size: 12 })}
      {children && <Space />}
    </Fragment>
  );

  const coloredChildren = React.Children.toArray(children).map((child, i) => {
    if (typeof child === 'string') {
      return (
        <PseudoLink key={i} selected={selected} onClick={onClick}>
          {positionedIcon}
          {child}
        </PseudoLink>
      );
    }
    if (getComponentDisplayName(child.type) === 'Link') {
      return (
        <PseudoLink key={i} selected={selected}>
          {positionedIcon}
          <a href={child.props.href}>{child.props.children}</a>
        </PseudoLink>
      );
    }
    return (
      <PseudoLink key={i} selected={selected}>
        {positionedIcon}
        {child}
      </PseudoLink>
    );
  });

  if (collapse) {
    return <PseudoLink>...</PseudoLink>;
  }
  if (children) {
    return coloredChildren;
  }
  return <PseudoLink selected={selected}>{positionedIcon}</PseudoLink>;
};

BreadcrumbItem.propTypes = {
  /**
   * Content of breadcrumb
   */
  children: PropTypes.node,
  /**
   * If true this breadcrumb is selected
   */
  selected: PropTypes.bool,
  /**
   * If true the breadcrumb is replaced with ellipsis
   */
  collapse: PropTypes.bool,
  /**
   * Function that is called when breadcrumb is clicked
   */
  onClick: PropTypes.func,
  /**
   * Icon to display next to the breadcrumb
   */
  icon: PropTypes.node,
};

BreadcrumbItem.defaultProps = {
  selected: false,
  collapse: false,
  onClick: () => {},
  icon: null,
};

export { BreadcrumbItem };
