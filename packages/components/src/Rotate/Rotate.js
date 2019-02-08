import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, StyleProvider } from '../StyleProvider';

const RotateImpl = createComponent(
  ({ deg }) => ({
    transform: `rotate(${deg}deg)`,
  }),
  'span',
  ['data-component'],
);

const Rotate = props => (
  <StyleProvider>
    <RotateImpl {...props} data-component="Rotate" />
  </StyleProvider>
);

Rotate.propTypes = {
  deg: PropTypes.number,
};

Rotate.defaultProps = {
  deg: 0,
};

export default Rotate;
