import MaterialGrid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';

const Column = props => <MaterialGrid {...props} item />;

const gridCountPropTypeValues = [
  false,
  'auto',
  true,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
];
Column.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * Defines the number of grids the component is going to use. It's applied for the lg breakpoint and wider screens if not overridden.
   */
  lg: PropTypes.oneOf(gridCountPropTypeValues),
  /**
   * Defines the number of grids the component is going to use. It's applied for the md breakpoint and wider screens if not overridden.
   */
  md: PropTypes.oneOf(gridCountPropTypeValues),
  /**
   * Defines the number of grids the component is going to use. It's applied for the sm breakpoint and wider screens if not overridden.
   */
  sm: PropTypes.oneOf(gridCountPropTypeValues),
  /**
   * Defines the number of grids the component is going to use. It's applied for the xl breakpoint and wider screens.
   */
  xl: PropTypes.oneOf(gridCountPropTypeValues),
  /**
   * Defines the number of grids the component is going to use. It's applied for all the screen sizes with the lowest priority.
   */
  xs: PropTypes.oneOf(gridCountPropTypeValues),
  /**
   * If true, it sets min-width: 0 on the item. Refer to the limitations section of the documentation to better understand the use case.
   */
  zeroMinWidth: PropTypes.bool,
};

Column.defaultProps = {
  lg: false,
  md: false,
  sm: false,
  xl: false,
  xs: false,
  /**
   * When set to false the requireProps mechanism in material-ui development builds throws a warning
   * https://github.com/mui-org/material-ui/blob/94609ca9329649d196435942cb28b2d14dd4cbfb/packages/material-ui/src/utils/requirePropFactory.js#L10
   */
  zeroMinWidth: undefined,
};
export default Column;
