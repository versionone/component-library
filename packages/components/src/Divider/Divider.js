import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

const DividerImpl = createComponent(
  ({ heavy, borderRight, borderLeft }) => ({
    height: 1,
    ...styleUtils.margin(0),
    ...styleUtils.conditionalStyle(
      !(borderLeft || borderRight),
      'border',
      'none',
    ),
    ...styleUtils.conditionalStyle(borderLeft, 'border-left', borderLeft),
    ...styleUtils.conditionalStyle(borderRight, 'border-right', borderRight),
    border: 'none',
    'flex-shrink': 0,
    'background-color': `rgba(0, 0, 0, ${heavy ? 0.2 : 0.08})`,
  }),
  'hr',
  ['data-component', 'data-test'],
);

const Divider = props => <DividerImpl {...props} data-component="Divider" />;

Divider.propTypes = {
  /*
   * Render a heavy variant of the divider
   */
  heavy: PropTypes.bool,
  /**
   * Apply a right border
   */
  borderRight: PropTypes.string,
  /**
   * Apply a left border
   */
  borderLeft: PropTypes.string,
};

Divider.defaultProps = {
  heavy: false,
  borderRight: null,
  borderLeft: null,
};

export { Divider };
