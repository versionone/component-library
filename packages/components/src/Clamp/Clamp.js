import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider } from '../StyleProvider';

const Root = createComponent(
  () => ({
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }),
  'div',
  ['data-test'],
);

const Clamp = ({ children, 'data-test': dataTest }) => (
  <StyleProvider>
    <Root data-test={dataTest}>{children}</Root>
  </StyleProvider>
);
Clamp.propTypes = {
  /** Content to clamp. */
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /** Use for e2e tests only. */
  'data-test': PropTypes.string,
};

export default Clamp;
