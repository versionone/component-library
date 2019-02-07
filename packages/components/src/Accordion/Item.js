import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { StyleProvider } from '../StyleProvider';

const Item = props => {
  const children = React.Children.map(props.children, (child, i) => {
    const childProps = Object.keys(props)
      .filter(propName => propName !== 'children')
      .reduce(
        (acc, next) => ({
          ...acc,
          [next]: props[next],
        }),
        {},
      );
    const clonedChild = React.cloneElement(child, childProps);
    return clonedChild;
  });

  return (
    <StyleProvider>
      <Fragment>{children}</Fragment>
    </StyleProvider>
  );
};

Item.propTypes = {
  /**
   * Disable padding in the panel
   */
  disablePadding: PropTypes.bool,
  /**
   * If true the panel is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If true the panel is open before any user interaction
   */
  open: PropTypes.bool,
  /**
   * Status that captures complex information in panel in a single color.
   */
  status: PropTypes.oneOf(['success', 'failure', 'pending', 'default']),
};

Item.defaultProps = {
  open: false,
  status: 'default',
  disabled: false,
  disablePadding: false,
};

export default Item;
