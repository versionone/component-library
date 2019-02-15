import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { Typography } from '../Typography';

const Impl = createComponent(
  ({ color, variant, bold, theme }) => ({
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
    'border-color': color || theme.Lozenge[variant].main,
    'border-style': 'solid',
    'border-width': 1,
    'max-width': 100,
    'text-overflow': 'ellipsis',
    overflow: 'hidden',
    'white-space': 'nowrap',
    'text-align': 'center',
    'text-decoration': 'none',
    'text-transform': 'uppercase',
    'line-height': '12px',
  }),
  'span',
  ['data-component', 'data-test'],
);

const Lozenge = props => {
  const { children, ...others } = props;
  return (
    <StyleProvider>
      <Impl {...others} data-component="Lozenge">
        <Typography is="span" variant="xSmall">
          {children}
        </Typography>
      </Impl>
    </StyleProvider>
  );
};

Lozenge.propTypes = {
  /**
   * message being conveyed
   */
  children: PropTypes.string.isRequired,
  /**
   * Sparse, important information
   */
  bold: PropTypes.bool,
  /**
   * variant of item
   */
  variant: PropTypes.oneOf(['error', 'warning', 'info', 'success']),
  /**
   * The border color of the Lozenge
   */
  color: PropTypes.string,
};

Lozenge.defaultProps = {
  bold: false,
  variant: 'info',
  color: null,
};

export { Lozenge };
