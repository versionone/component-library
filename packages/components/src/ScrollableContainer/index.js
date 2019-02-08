import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, createComponent } from '../StyleProvider';
import { palette } from "../palette";

const Container = createComponent(
  ({ height, width }) => ({
    'max-height': height,
    width,
    'overflow-y': 'auto',
    '&::-webkit-scrollbar-thumb': {
      'background-color': palette.dove,
      'border-radius': '3px',
      'border-width': '1px 2px 1px 1px',
      'border-style': 'solid',
      'border-color': palette.paper,
    },
    '&::-webkit-scrollbar-track': {
      'background-color': palette.paper,
    },
    '&::-webkit-scrollbar': {
      width: 8,
      height: 0,
    },
  }),
  'div',
  ['data-component', 'data-test'],
);

const ScrollableContainer = props => (
  <StyleProvider>
    <Container {...props} data-component="ScrollableContainer" />
  </StyleProvider>
);

ScrollableContainer.propTypes = {
  /**
   * Height of the container. If the content is shorter than the height then no scrollbar is applied
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Width of the container
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ScrollableContainer.defaultProps = {
  height: '100%',
  width: '100%',
};

export { ScrollableContainer };
