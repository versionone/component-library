import React from 'react';

class DetectExternalEvents extends React.Component {
  _disposeTopLevelEvents = null;
  _lastInterceptedEvent = null;

  render() {
    const { children, component = 'div', reactEvents } = this.props;
    const events = reactEvents.reduce((obj, eventName) => {
      obj[eventName] = this._handleWrapperEvent;
      return obj;
    }, {});
    return React.createElement(component, events, children);
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

export default DetectExternalEvents;
