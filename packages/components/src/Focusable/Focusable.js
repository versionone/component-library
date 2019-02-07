import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { TrackEventState } from '../TrackEventState';

const Focusable = ({ children, focused, onBlur, onFocus }) => (
  <TrackEventState
    eventState={focused}
    off="onBlur"
    offHandler={onBlur}
    offTrigger={el => el.blur()}
    on="onFocus"
    onHandler={onFocus}
    onTrigger={el => el.focus()}
  >
    {({ bind, eventState, ref }) =>
      children({ bind, focused: eventState, ref })
    }
  </TrackEventState>
);
Focusable.propTypes = {
  /** Render prop providing ref, focused state, and binding event handlers. */
  children: PropTypes.func.isRequired,
  /** When true, indicates ref is focused. */
  focused: PropTypes.bool,
  /** blur event handler invoked state tracking. */
  onBlur: PropTypes.func,
  /** focus event handler invoked state tracking. */
  onFocus: PropTypes.func,
};
Focusable.defaultProps = {
  focused: false,
  onBlur: noop,
  onFocus: noop,
};
export default Focusable;
