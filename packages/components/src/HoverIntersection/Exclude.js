import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { Consumer } from './Context';
import { EventBoundary } from '../EventBoundary';
import { Hoverable } from '../Hoverable';

const Exclude = ({ children }) => (
  <Consumer>
    {({ onMouseEnter, onMouseLeave }) => (
      <Hoverable onMouseEnter={onMouseLeave} onMouseLeave={onMouseEnter}>
        {({ hovered, bind: { onMouseEnter, onMouseLeave } }) => (
          <EventBoundary
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            {bind => children({ bind, hovered })}
          </EventBoundary>
        )}
      </Hoverable>
    )}
  </Consumer>
);

Exclude.propTypes = {
  /** Render prop providing hovered state and event handlers for managing hover state. */
  children: PropTypes.func.isRequired,
};

Exclude.defaultProps = {
  onClick: noop,
};

export default Exclude;
