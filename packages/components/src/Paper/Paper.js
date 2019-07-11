import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

const PaperImpl = createComponent(
  ({ square, theme }) => ({
    boxShadow: theme.Paper.boxShadow,
    ...styleUtils.conditionalStyle(!square, 'border-radius', theme.Paper.borderRadius),
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
};
Paper.defaultProps = {
  square: false,
};
export { Paper };
