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
    '> a': {
      'text-decoration': 'none',
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
    },
    '> a:hover:visited': {
      ...styleUtils.conditionalStyle(
        !selected,
        'color',
        theme.Breadcrumb.mainHighlight,
      ),
    },
    '> a:visited': {
      ...styleUtils.conditionalStyle(
        selected,
        'color',
        theme.Breadcrumb.selected,
        theme.Breadcrumb.main,
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
  const icon = props.icon && (
    <Fragment>
      {React.createElement(props.icon, { size: 12 })}
      {props.children && <Space />}
    </Fragment>
  );

  const coloredChildren = React.Children.toArray(props.children).map(
    (child, i) => {
      return typeof child === 'string' ? (
        <PseudoLink key={i} selected={props.selected} onClick={props.onClick}>
          {icon}
          {child}
        </PseudoLink>
      ) : getComponentDisplayName(child.type) === 'Link' ? (
        <PseudoLink key={i} selected={props.selected}>
          {icon}
          <a href={child.props.href}>{child.props.children}</a>
        </PseudoLink>
      ) : (
        <PseudoLink key={i} selected={props.selected}>
          {icon}
          {child}
        </PseudoLink>
      );
    },
  );

  return props.collapse ? (
    <PseudoLink>...</PseudoLink>
  ) : props.children ? (
    coloredChildren
  ) : (
    <PseudoLink selected={props.selected}>{icon}</PseudoLink>
  );
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
};

BreadcrumbItem.defaultProps = {
  selected: false,
  collapse: false,
  onClick: () => {},
};

export { BreadcrumbItem };
