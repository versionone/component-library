import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { StyleProvider } from '../StyleProvider';

const Item = ({ children, ...otherProps }) => {
  return (
    <StyleProvider>
      <Fragment>
        {React.Children.map(children, (child, i) => {
          const childProps = Object.keys(otherProps).reduce(
            (acc, next) => ({
              ...acc,
              [next]: otherProps[next],
            }),
            {},
          );
          const clonedChild = React.cloneElement(child, childProps);
          return clonedChild;
        })}
      </Fragment>
    </StyleProvider>
  );
};

Item.propTypes = {
  /** Children to display within panel. */
  children: PropTypes.node,
  /**
   * Disable padding in the panel
   */
  disablePadding: PropTypes.bool,
  /**
   * If true the panel is disabled
   */
  disabled: PropTypes.bool,
  /** When true, Item's header is focused. */
  focused: PropTypes.bool,
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
  disabled: false,
  disablePadding: false,
  focused: false,
  open: false,
  status: 'default',
};

export default Item;
