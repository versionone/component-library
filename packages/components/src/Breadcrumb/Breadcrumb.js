import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { createComponent, StyleProvider } from '../StyleProvider';
import { SpacedGroup } from '../SpacedGroup';

const Separator = createComponent(
  ({ theme }) => ({
    color: theme.Breadcrumb.main,
  }),
  'span',
);

class Breadcrumb extends React.Component {
  render() {
    const count = React.Children.count(this.props.children) - 1;

    const children = React.Children.map(this.props.children, (child, i) => {
      return i === count ? (
        child
      ) : (
        <Fragment>
          {child}
          <Separator>{this.props.separator}</Separator>
        </Fragment>
      );
    });

    return (
      <StyleProvider>
        <span data-component="Breadcrumbs">
          <SpacedGroup xs={4} center>
            {children}
          </SpacedGroup>
        </span>
      </StyleProvider>
    );
  }
}
Breadcrumb.propTypes = {
  /**
   * Collection Breadcrumb.Items
   */
  children: PropTypes.arrayOf(PropTypes.instanceOf(BreadcrumbItem)),
  /**
   * Separator character
   */
  separator: PropTypes.string,
};

Breadcrumb.defaultProps = {
  separator: '/',
};

export { Breadcrumb };
