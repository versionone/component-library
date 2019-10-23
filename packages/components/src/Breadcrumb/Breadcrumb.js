import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { BreadcrumbItem } from './BreadcrumbItem';
import { SpacedGroup } from '../SpacedGroup';

class Breadcrumb extends React.Component {
  render() {
    const { children, separator } = this.props;
    const count = React.Children.count(children) - 1;

    const separatedChildren = React.Children.map(children, (child, i) => {
      return i === count ? (
        child
      ) : (
        <Fragment>
          {child}
          <span>{separator}</span>
        </Fragment>
      );
    });

    return (
      <span data-component="Breadcrumbs">
        <SpacedGroup xs={4} center>
          {separatedChildren}
        </SpacedGroup>
      </span>
    );
  }
}
Breadcrumb.propTypes = {
  /**
   * Collection BreadcrumbItem
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
