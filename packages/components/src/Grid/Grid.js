import MaterialGrid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
import Column from './Column';

const Grid = props => <MaterialGrid {...props} container />;

Grid.propTypes = {
  /**
   * Defines the align-content style property. It's applied for all screen sizes.
   */
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /**
   * Defines the align-items style property. It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  /**
   * The Column(s) of the component.
   */
  children: PropTypes.node,
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  /**
   * Defines the justify-content style property. It is applied for all screen sizes.
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  /**
   * Defines the space between the type item component. It can only be used on a type container component.
   */
  spacing: PropTypes.oneOf([0, 8, 16, 24, 32, 40]),
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   */

  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
};

Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  direction: 'row',
  justify: 'flex-start',
  spacing: 0,
  wrap: 'wrap',
};

export default Grid;
