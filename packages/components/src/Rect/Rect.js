import PropTypes from 'prop-types';
import React, { createRef } from 'react';
import invariant from 'invariant';
import { ResizeObserver } from 'resize-observer';

class Rect extends React.Component {
  constructor(props) {
    super(props);
    this.ref = createRef();
    this.state = {
      rect: {},
    };
    this.setRect = this.setRect.bind(this);
  }

  componentDidMount() {
    invariant(this.ref, 'You must assign the ref to a component.');
    const { notObserved } = this.props;
    this.observer = new ResizeObserver(this.setRect);
    if (!notObserved) {
      this.observer.observe(this.ref.current, this.setRect);
    }
    this.setRect();
  }

  componentWillUnmount() {
    this.observer.unobserve(this.ref.current);
  }

  componentDidUpdate(prevProps) {
    const { notObserved } = this.props;
    if (notObserved) {
      this.observer.unobserve(this.ref.current);
    }
    if (prevProps.notObserved && !notObserved) {
      this.observer.observe(this.ref.current, this.setRect);
    }
  }

  render() {
    const { children } = this.props;
    const { rect } = this.state;
    return children({
      ref: this.ref,
      rect,
    });
  }

  setRect() {
    this.setState({
      rect: this.ref.current.getBoundingClientRect(),
    });
  }
}
Rect.propTypes = {
  /** Render prop receiving a ref and rect information for the ref. */
  children: PropTypes.func.isRequired,
  /** When true, will not track and update ref position information. */
  notObserved: PropTypes.bool,
};
Rect.defaultProps = {
  notObserved: false,
};

export { Rect };
