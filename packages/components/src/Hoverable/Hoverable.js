import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { TrackEventState } from '../TrackEventState';

const Hoverable = ({ children, hovered, onMouseEnter, onMouseLeave }) => (
  <TrackEventState
    eventState={hovered}
    off="onMouseLeave"
    offHandler={onMouseLeave}
    on="onMouseEnter"
    onHandler={onMouseEnter}
  >
    {({ bind, eventState, ref }) =>
      children({ bind, hovered: eventState, ref })
    }
  </TrackEventState>
);
Hoverable.propTypes = {
  /** Render prop providing ref, hovered state, and binding event handlers. */
  children: PropTypes.func.isRequired,
  /** When true, indicates ref is hovered. */
  hovered: PropTypes.bool,
  /** mouseenter event handler invoked after state tracking. */
  onMouseEnter: PropTypes.func,
  /** mouseleave event handler invoked after state tracking. */
  onMouseLeave: PropTypes.func,
};
Hoverable.defaultProps = {
  hovered: false,
  onMouseEnter: noop,
  onMouseLeave: noop,
};
export default Hoverable;
