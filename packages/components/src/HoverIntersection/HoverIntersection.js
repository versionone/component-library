import React from 'react';
import PropTypes from 'prop-types';
import { Hoverable } from './../Hoverable';
import { Provider } from './Context';

const HoverIntersection = ({ children }) => (
  <Hoverable>
    {({ hovered, bind }) => (
      <Provider value={bind}>{children({ bind, hovered })}</Provider>
    )}
  </Hoverable>
);

HoverIntersection.propTypes = {
  children: PropTypes.func.isRequired,
};

export default HoverIntersection;
