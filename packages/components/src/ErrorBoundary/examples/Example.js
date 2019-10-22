import React, { Fragment } from 'react';
import { ErrorBoundary } from '..';

const Fallback = () => <div>We ran out of mice</div>;

export class Example extends React.Component {
  constructor() {
    super();
    this.state = {
      count: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(state => ({ count: state.count + 1 }));
  }

  componentDidCatch() {
    debugger;
  }

  render() {
    const { count } = this.state;
    return (
      <ErrorBoundary Fallback={Fallback} onError={console.error}>
        <button onClick={this.handleClick} type="button">
          <div>Click me until I produce error </div>
        </button>
        <div>{count < 2 ? count : count.iWillThrow()}</div>
      </ErrorBoundary>
    );
  }
}
