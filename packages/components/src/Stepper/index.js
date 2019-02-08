import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils, StyleProvider } from '../StyleProvider';
import Step from './Step';

const StepperImpl = createComponent(
  ({ direction }) => ({
    display: 'flex',
    ...styleUtils.conditionalStyle(
      direction === 'vertical',
      'flex-direction',
      'column',
      'row',
    ),
  }),
  'div',
);

class Stepper extends React.Component {
  render() {
    const count = React.Children.count(this.props.children) - 1;

    const children = React.Children.map(this.props.children, (child, i) =>
      React.cloneElement(child, {
        index: i + 1,
        isLast: i === count,
        direction: this.props.direction,
        size: this.props.size,
      }),
    );
    return (
      <StyleProvider>
        <div data-component="Stepper" data-test={this.props['data-test']}>
          <StepperImpl direction={this.props.direction}>{children}</StepperImpl>
        </div>
      </StyleProvider>
    );
  }
}

Stepper.propTypes = {
  /**
   * Render the stepper vertically or horizontally
   */
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Determine the size of the stepper
   */
  size: PropTypes.oneOf([24, 36]),
};

Stepper.defaultProps = {
  direction: 'horizontal',
  size: 36,
};

Stepper.Step = Step;
export { Stepper };
