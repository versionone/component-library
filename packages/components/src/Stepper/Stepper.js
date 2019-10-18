import PropTypes from 'prop-types';
import React, { Children, Component } from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

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

class Stepper extends Component {
  render() {
    const {
      children,
      direction,
      size,
      lineLength,
      afterLength,
      'data-test': dataTest,
    } = this.props;
    const count = Children.count(children) - 1;

    const steps = Children.map(children, (child, i) =>
      React.cloneElement(child, {
        index: i + 1,
        isLast: i === count,
        direction,
        size,
        lineLength,
        afterLength,
      }),
    );
    return (
      <div data-component="Stepper" data-test={dataTest}>
        <StepperImpl direction={direction}>{steps}</StepperImpl>
      </div>
    );
  }
}

Stepper.propTypes = {
  /**
   * collection of one or more StepperStep components
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  /**
   * Render the stepper vertically or horizontally
   */
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  /**
   * Determine the size of the stepper
   */
  size: PropTypes.oneOf([24, 36]),
  /**
   * Determine the length of the line between steps. The length of the line may be longer on horizontal steppers if the description is longer than the title.
   */
  lineLength: PropTypes.number,
  /**
   * Determine the space after the last step of the stepper, since there is no line after the step to create this space.
   */
  afterLength: PropTypes.number,
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

Stepper.defaultProps = {
  direction: 'horizontal',
  size: 36,
  lineLength: 24,
  afterLength: 24,
};

export { Stepper };
