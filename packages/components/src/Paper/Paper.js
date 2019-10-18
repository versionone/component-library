import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

const PaperImpl = createComponent(
  ({ square, elevation, theme }) => ({
    ...styleUtils.conditionalStyle(
      elevation,
      'box-shadow',
      theme.Paper.elevation.boxShadow,
      theme.Paper.boxShadow,
    ),
    ...styleUtils.conditionalStyle(
      elevation,
      'border',
      theme.Paper.elevation.border,
    ),
    ...styleUtils.conditionalStyle(
      !square,
      'border-radius',
      theme.Paper.borderRadius,
    ),
    backgroundColor: theme.Paper.background,
    width: '100%',
  }),
  'div',
  ['data-component', 'data-test'],
);

const Paper = props => <PaperImpl {...props} data-component="Paper" />;
Paper.propTypes = {
  /**
   * The content of the component.
   */
  children: PropTypes.node,
  /**
   * If `true`, rounded corners are disabled.
   */
  square: PropTypes.bool,
  /**
   * Elevation off a page, starting at 0
   */
  elevation: PropTypes.bool,
};
Paper.defaultProps = {
  square: false,
  elevation: false,
};
export { Paper };
