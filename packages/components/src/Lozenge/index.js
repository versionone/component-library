import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';

const Impl = createComponent(
  ({ variant, bold, theme }) => ({
    'border-radius': 5,
    ...styleUtils.padding(2, 5),
    ...styleUtils.conditionalStyle(bold, 'font-weight', 'bold'),
    ...styleUtils.conditionalStyle(
      bold,
      'background-color',
      theme.Lozenge[variant].main,
      'white',
    ),
    ...styleUtils.conditionalStyle(
      bold,
      'color',
      'white',
      theme.Lozenge[variant].main,
    ),
    'border-color': theme.Lozenge[variant].main,
    'border-style': 'solid',
    'border-width': 1,
    'max-width': 100,
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
    'text-align': 'center',
    'text-decoration': 'none',
    'text-transform': 'uppercase',
    'font-size': 11,
  }),
  'span',
  ['data-component', 'data-test'],
);

const Lozenge = props => (
  <StyleProvider>
    <Impl {...props} data-component="Lozenge">
      {props.text}
    </Impl>
  </StyleProvider>
);

Lozenge.propTypes = {
  /**
   * message being conveyed
   */
  text: PropTypes.string.isRequired,
  /**
   * Sparse, important information
   */
  bold: PropTypes.bool,
  /**
   * variant of item
   */
  variant: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
};

Lozenge.defaultProps = {
  bold: false,
  variant: 'info',
};

export default Lozenge;
