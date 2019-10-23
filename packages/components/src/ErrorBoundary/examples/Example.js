import React from 'react';

export const Fallback = () => <div>We ran out of mice</div>;

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

  render() {
    const { count } = this.state;
    return <Child count={count} handleClick={this.handleClick} />;
  }
}

const Child = ({ count, handleClick }) => {
  if (count > 2) {
    throw new Error(count);
  } else
    return (
      <div>
        <button onClick={handleClick} type="button">
          <div>Click me until I produce error </div>
        </button>
        <div>{count}</div>
      </div>
    );
};
