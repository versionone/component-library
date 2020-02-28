import React, { PureComponent } from 'react';

class DetectExternalEvents extends PureComponent {
  _disposeTopLevelEvents = null;

  _lastInterceptedEvent = null;

  render() {
    const {
      children,
      component,
      'data-component': dataComponent,
      reactEvents,
    } = this.props;
    const events = reactEvents.reduce((obj, eventName) => {
      obj[eventName] = this._handleWrapperEvent;
      return obj;
    }, {});
    const props = { ...events, 'data-component': dataComponent };
    return React.createElement(component, props, children);
  }

  componentDidMount() {
    this._setupTopLevelEvents();
  }

  componentDidUpdate() {
    this._setupTopLevelEvents();
  }

  componentWillUnmount() {
    if (this._disposeTopLevelEvents) {
      this._disposeTopLevelEvents();
      this._disposeTopLevelEvents = null;
    }
  }

  _setupTopLevelEvents() {
    if (this._disposeTopLevelEvents) {
      this._disposeTopLevelEvents();
      this._disposeTopLevelEvents = null;
    }
    const { domEvents } = this.props;
    domEvents.forEach(eventName => {
      window.addEventListener(eventName, this._handleTopLevelEvent);
    });
    this._disposeTopLevelEvents = () => {
      domEvents.forEach(eventName => {
        window.removeEventListener(eventName, this._handleTopLevelEvent);
      });
    };
  }

  _handleWrapperEvent = event => {
    this._lastInterceptedEvent = event.nativeEvent;
  };

  _handleTopLevelEvent = event => {
    const { onExternalEvent } = this.props;
    const wasEventIntercepted = this._lastInterceptedEvent === event;
    if (!wasEventIntercepted) {
      onExternalEvent(event);
    }
    this._lastInterceptedEvent = null;
  };
}

DetectExternalEvents.defaultProps = {
  component: 'div',
  reactEvents: [],
};

export { DetectExternalEvents };
