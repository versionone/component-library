import PropTypes from 'prop-types'
import React from 'react'
import { noop } from 'underscore'

const ColumnInstance = ({ children, ...otherProps }) => {
  const colWidth = otherProps.colWidth
    ? otherProps.colWidth
    : otherProps.calculatedWidth;
  return React.Children.map(children, child => {
    return React.createElement(
      'span',
      {
        style: { width: colWidth, wordWrap: 'break-word' },
        className: otherProps.columnClass,
        onClick: otherProps.onColumnClick,
      },
      child,
    )
  })
}

ColumnInstance.propTypes = {
  /**
   * Column data
   */
  children: PropTypes.node,
  /**
   * width % of column
   */
  colWidth: PropTypes.string,
  /**
   * Column className
   */
  columnClass: PropTypes.string,
  /**
   * Function to be triggered onClick of column
   */
  onColumnClick: noop,
};

ColumnInstance.defaultProps = {};

export default ColumnInstance;
