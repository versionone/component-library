import PropTypes from 'prop-types';
import { Component, createRef } from 'react';
import { noop } from 'underscore';

class TrackEventState extends Component {
  constructor({ eventState }) {
    super();
    this.state = {
      eventState,
    };
    this.ref = createRef();

    this.handleEvent = this.handleEvent.bind(this);
    this.triggerEvent = this.triggerEvent.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    return props.eventState || state.eventState;
  }

  componentDidMount() {
    const { eventState } = this.state;
    const { onTrigger, offTrigger } = this.props;
    if (eventState) {
      this.triggerEvent(onTrigger);
    } else {
      this.triggerEvent(offTrigger);
    }
  }

  componentDidUpdate(prevProps) {
    const { eventState, onTrigger, offTrigger } = this.props;
    const { eventState: computedEventState } = this.state;
    if (!prevProps.eventState && eventState && !computedEventState) {
      this.setState({ eventState }, this.triggerEvent(onTrigger));
    } else if (prevProps.eventState && !eventState && computedEventState) {
      this.setState({ eventState }, this.triggerEvent(offTrigger));
    }
  }

  render() {
    const { children, off, offHandler, on, onHandler } = this.props;
    const { eventState } = this.state;
    return children({
      eventState,
      ref: this.ref,
      bind: {
        [on]: this.handleEvent(onHandler, true),
        [off]: this.handleEvent(offHandler, false),
      },
    });
  }

  triggerEvent(triggerFn) {
    if (this.ref.current) {
      triggerFn(this.ref.current);
    }
  }

  handleEvent(handler, eventState) {
    return evt => {
      evt.persist();
      this.setState({ eventState }, () => handler(evt));
    };
  }
}
TrackEventState.propTypes = {
  /** Render prop providing consumer with ref, focused state and event handlers */
  children: PropTypes.func.isRequired,
  /** Indicates an on or off state for an event. */
  eventState: PropTypes.bool,
  /** Event to indicating an off state. */
  off: PropTypes.string.isRequired,
  /** Event handler for "on" state event. */
  offHandler: PropTypes.func,
  /** Function that triggers corresponding "on" state event to a DOM element. */
  offTrigger: PropTypes.func,
  /** Event to indicating an on state. */
  on: PropTypes.string.isRequired,
  /** Event handler for "off" state event. */
  onHandler: PropTypes.func,
  /** Function that triggers corresponding "off" state event to a DOM element. */
  onTrigger: PropTypes.func,
};
TrackEventState.defaultProps = {
  eventState: false,
  offTrigger: noop,
  onTrigger: noop,
  onHandler: noop,
  offHandler: noop,
};
export { TrackEventState };
