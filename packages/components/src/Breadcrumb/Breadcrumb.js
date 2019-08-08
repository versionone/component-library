import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { SpacedGroup } from '../SpacedGroup';

class Breadcrumb extends React.Component {
  render() {
    const count = React.Children.count(this.props.children) - 1;

    const children = React.Children.map(this.props.children, (child, i) => {
      return i === count ? (
        child
      ) : (
        <Fragment>
          {child}
          <span>{this.props.separator}</span>
        </Fragment>
      );
    });

    return (
      <span data-component="Breadcrumbs">
        <SpacedGroup xs={4} center>
          {children}
        </SpacedGroup>
      </span>
    );
  }
}
Breadcrumb.propTypes = {
  /**
   * Collection Breadcrumb.Items
   */
  children: PropTypes.arrayOf(PropTypes.instanceOf(BreadcrumbItem)),
  /**
   * Separator character. Default is '/'
   */
  separator: PropTypes.string,
};

Breadcrumb.defaultProps = {
  separator: '/',
};

export { Breadcrumb };
