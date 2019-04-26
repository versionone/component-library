import React from 'react';
import PropTypes from 'prop-types';
import { createComponent } from '../StyleProvider';

const RotateImpl = createComponent(
  ({ deg }) => ({
    transform: `rotate(${deg}deg)`,
  }),
  'span',
  ['data-component'],
);

const Rotate = props => <RotateImpl {...props} data-component="Rotate" />;

Rotate.propTypes = {
  /**
   * Degs to rotate
   */
  deg: PropTypes.number,
};

Rotate.defaultProps = {
  deg: 0,
};

export { Rotate };
