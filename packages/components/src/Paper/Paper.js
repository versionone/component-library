import PropTypes from 'prop-types';
import React from 'react';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const PaperImpl = createComponent(
  ({ square, theme }) => ({
    backgroundColor: theme.Paper.main,
    boxShadow: `0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)`,
    ...styleUtils.conditionalStyle(!square, 'border-radius', 4),
    width: '100%',
  }),
  'div',
  ['data-component', 'data-test'],
);

const Paper = props => (
  <StyleProvider>
    <PaperImpl {...props} data-component="Paper" />
  </StyleProvider>
);
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
