import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { noop } from 'underscore'
import ColumnInstance from './ColumnInstance'

const RowInstance = ({ children, ...otherProps }) => {
  const style = { display: 'flex' };
  style.borderBottom = otherProps.isHeader
    ? `2px solid rgba(0, 0, 0, 0.2)`
    : `1px solid rgba(0, 0, 0, 0.08)`;
  const colWidth = `${100 / children.length}%`;
  const props = Object.assign({}, otherProps);
  props.calculatedWidth = colWidth;
  return (
    <Fragment>
      {React.createElement(
        'div',
        {
          style,
          className: otherProps.rowClass,
          onClick: otherProps.onRowClick,
          key: otherProps.key,
        },
        React.Children.map(children, child => {
          return React.cloneElement(child, props)
        }),
      )}
    </Fragment>
  )
}

RowInstance.propTypes = {
  /**
   * Columns to display within Row.
   */
  children: PropTypes.instanceOf(ColumnInstance),
  /**
   * Row className
   */
  rowClass: PropTypes.string,
  /**
   * Function to be triggered onClick of row
   */
  onRowClick: noop,
};

RowInstance.defaultProps = {};

export default RowInstance;
