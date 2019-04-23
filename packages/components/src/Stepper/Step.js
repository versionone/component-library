import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

// const size = 24;
// const leftOffset = ((size / 2) + 8) * -1;
// const topOffset = size + 4;

const getDimensions = size => {
  const leftOffset = (size / 2 + 8) * -1;
  const topOffset = size + 4;
  const fontSize = size / 2;

  return {
    leftOffset,
    topOffset,
    fontSize,
  };
};

const StepIcon = createComponent(
  ({ size, seen, current, theme }) => ({
    width: size,
    height: size,
    'min-width': size,
    'line-height': size,
    'border-radius': '50%',
    'border-width': 1,
    'border-style': 'solid',
    'font-size': getDimensions(size).fontSize,
    'margin-right': 8,
    ...styleUtils.conditionalStyle(
      seen || current,
      'border-color',
      theme.Stepper.active.main,
      theme.Stepper.inactive.inverse,
    ),
    ...styleUtils.conditionalStyle(
      current,
      'background-color',
      theme.Stepper.active.main,
      theme.Stepper.active.inverse,
    ),
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'flex-direction': 'row',
    '> span': {
      display: 'flex',
      'align-items': 'center',
    },
  }),
  'div',
);

const StepIconNumber = createComponent(
  ({ seen, current, theme }) => ({
    position: 'relative',
    top: -1,
    'line-height': 1,
    ...styleUtils.conditionalStyle(
      current,
      'color',
      theme.Stepper.active.inverse,
    ),
    ...styleUtils.conditionalStyle(seen, 'color', theme.Stepper.active.main),
    ...styleUtils.conditionalStyle(
      !(seen || current),
      'color',
      theme.Stepper.inactive.inverse,
    ),
  }),
  'span',
);

const StepTextContainer = createComponent(
  () => ({
    display: 'inline-block',
    'vertical-align': 'top',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
  }),
  'div',
);

const StepTitle = createComponent(
  ({ size, direction, seen, current, isLast, theme }) => {
    const { topOffset, leftOffset } = getDimensions(size);

    const linePosition =
      direction === 'vertical'
        ? {
            top: topOffset,
            left: leftOffset,
            width: 1,
            height: 9999,
          }
        : {
            top: 16,
            left: '100%',
            height: 1,
            width: 9999,
          };

    const line = isLast
      ? {}
      : {
          ':after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            ...styleUtils.conditionalStyle(
              seen || current,
              'background-color',
              theme.Stepper.active.main,
              theme.Stepper.inactive.inverse,
            ),
            ...linePosition,
          },
        };
    return {
      ...styleUtils.conditionalStyle(
        current,
        'color',
        theme.Stepper.title,
        theme.Stepper.fainted,
      ),
      'font-weight': '500',
      position: 'relative',
      'padding-right': 16,
      ...line,
    };
  },
  'div',
);

const StepDescription = createComponent(
  ({ size, direction, current, theme }) => ({
    ...styleUtils.conditionalStyle(
      current,
      'color',
      theme.Stepper.description,
      theme.Stepper.fainted,
    ),
    'font-size': getDimensions(size).fontSize - 2,
    overflow: 'hidden',
    'white-space': 'nowrap',
    'text-overflow': 'ellipsis',
    ...styleUtils.conditionalStyle(
      direction !== 'vertical',
      'width',
      'calc(100% - 20px)',
      '100%',
    ),
    ...styleUtils.conditionalStyle(direction !== 'vertical', 'max-width', 140),
    ...styleUtils.conditionalStyle(direction !== 'vertical', 'min-width', 0),
  }),
  'div',
);

const StepImpl = createComponent(
  ({ direction }) => ({
    display: 'flex',
    'flex-direction': 'row',
    ...styleUtils.conditionalStyle(
      direction === 'vertical',
      'margin-bottom',
      4,
    ),
    ...styleUtils.conditionalStyle(direction === 'vertical', 'height', 60),
    ...styleUtils.conditionalStyle(
      direction !== 'vertical',
      'margin-right',
      16,
    ),
    overflow: 'hidden',
  }),
  'div',
  ['data-component'],
);

const Step = props => {
  const stepIcon = props.icon ? React.createElement(props.icon) : props.index;

  return (
    <StepImpl data-component="Step" direction={props.direction}>
      <StepIcon size={props.size} seen={props.seen} current={props.current}>
        <StepIconNumber seen={props.seen} current={props.current}>
          {stepIcon}
        </StepIconNumber>
      </StepIcon>
      <StepTextContainer>
        <StepTitle
          size={props.size}
          direction={props.direction}
          isLast={props.isLast}
          seen={props.seen}
          current={props.current}
        >
          {props.title}
        </StepTitle>
        <StepDescription
          size={props.size}
          direction={props.direction}
          current={props.current}
        >
          {props.description}
        </StepDescription>
      </StepTextContainer>
    </StepImpl>
  );
};

Step.propTypes = {
  /**
   * Title of the step
   */
  title: PropTypes.string,
  /**
   * Description of the step
   */
  description: PropTypes.string,
  /**
   * Icon of the step
   */
  icon: PropTypes.any,
  /**
   * Status of the step
   */
  status: PropTypes.oneOf(['success', 'failure', 'loading', 'default']),
  /**
   * If true the step is the active step
   */
  current: PropTypes.bool,
  /**
   * If true the step has been visited
   */
  seen: PropTypes.bool,
};

Step.defaultProps = {
  title: '',
  description: '',
  icon: null,
  status: 'default',
  current: false,
  seen: false,
};

export default Step;
