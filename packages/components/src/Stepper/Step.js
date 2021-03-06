import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const getDimensions = size => {
  const leftOffset = (size / 2 + 8) * -1;
  const topOffset = size;
  const fontSize = size / 2;

  return {
    leftOffset,
    topOffset,
    fontSize,
  };
};

const StepIcon = createComponent(({ size, seen, current, theme }) => {
  const unseen = !(current || seen);
  return {
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
      current,
      'border-color',
      theme.Stepper.current.main,
    ),
    ...styleUtils.conditionalStyle(
      seen,
      'border-color',
      theme.Stepper.seen.inverse,
    ),
    ...styleUtils.conditionalStyle(
      unseen,
      'border-color',
      theme.Stepper.default.inverse,
    ),
    ...styleUtils.conditionalStyle(
      current,
      'background-color',
      theme.Stepper.current.main,
    ),
    ...styleUtils.conditionalStyle(
      seen,
      'background-color',
      theme.Stepper.seen.main,
    ),
    ...styleUtils.conditionalStyle(
      unseen,
      'background-color',
      theme.Stepper.default.main,
    ),
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'flex-direction': 'row',
    '> span': {
      display: 'flex',
      'align-items': 'center',
    },
    'box-sizing': 'border-box',
    ...styleUtils.conditionalStyle(current, ':before', {
      content: '""',
      position: 'absolute',
      'background-color': theme.Stepper.current.main,
      opacity: 0.4,
      'border-radius': '50%',
      width: size + (size / 8) * 2,
      height: size + (size / 8) * 2,
      'box-sizing': 'border-box',
    }),
  };
}, 'div');

const StepIconNumber = createComponent(
  ({ seen, current, theme }) => ({
    position: 'relative',
    top: -1,
    'line-height': 1,
    ...styleUtils.conditionalStyle(
      current,
      'color',
      theme.Stepper.current.inverse,
    ),
    ...styleUtils.conditionalStyle(seen, 'color', theme.Stepper.seen.inverse),
    ...styleUtils.conditionalStyle(
      !(seen || current),
      'color',
      theme.Stepper.default.inverse,
    ),
  }),
  'span',
);

const StepTextContainer = createComponent(
  () => ({
    'vertical-align': 'top',
    display: 'flex',
    'flex-direction': 'column',
    'align-items': 'flex-start',
  }),
  'div',
);

const StepTitle = createComponent(
  ({
    size,
    direction,
    seen,
    current,
    isLast,
    theme,
    hasDescription,
    lineLength,
    afterLength,
  }) => {
    const { topOffset, leftOffset } = getDimensions(size);

    const unseen = !(current || seen);
    const linePosition =
      direction === 'vertical'
        ? {
            left: leftOffset,
            width: 0,
            height: 9999,
            ...styleUtils.conditionalStyle(
              hasDescription,
              'top',
              topOffset,
              topOffset - size / 4,
            ),
            ...styleUtils.conditionalStyles(current, {
              'border-left-style': theme.Stepper.current.lineStyle,
              'border-left-color': theme.Stepper.current.lineColor,
              'border-left-width': theme.Stepper.current.lineWidth,
            }),
            ...styleUtils.conditionalStyles(seen, {
              'border-left-style': theme.Stepper.seen.lineStyle,
              'border-left-color': theme.Stepper.seen.lineColor,
              'border-left-width': theme.Stepper.seen.lineWidth,
            }),
            ...styleUtils.conditionalStyles(unseen, {
              'border-left-style': theme.Stepper.default.lineStyle,
              'border-left-color': theme.Stepper.default.lineColor,
              'border-left-width': theme.Stepper.default.lineWidth,
            }),
          }
        : {
            left: '100%',
            height: 0,
            width: 9999,
            top: '50%',
            ...styleUtils.conditionalStyles(current, {
              'border-top-style': theme.Stepper.current.lineStyle,
              'border-top-color': theme.Stepper.current.lineColor,
              'border-top-width': theme.Stepper.current.lineWidth,
            }),
            ...styleUtils.conditionalStyles(seen, {
              'border-top-style': theme.Stepper.seen.lineStyle,
              'border-top-color': theme.Stepper.seen.lineColor,
              'border-top-width': theme.Stepper.seen.lineWidth,
            }),
            ...styleUtils.conditionalStyles(unseen, {
              'border-top-style': theme.Stepper.default.lineStyle,
              'border-top-color': theme.Stepper.default.lineColor,
              'border-top-width': theme.Stepper.default.lineWidth,
            }),
          };

    const line = isLast
      ? {}
      : {
          ':after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            'background-color': palette.transparent,
            ...linePosition,
          },
        };
    return {
      ...styleUtils.conditionalStyle(
        current,
        'color',
        theme.Stepper.current.title,
      ),
      ...styleUtils.conditionalStyle(seen, 'color', theme.Stepper.seen.title),
      ...styleUtils.conditionalStyle(
        unseen,
        'color',
        theme.Stepper.default.title,
      ),
      'font-weight': theme.Stepper.titleWeight,
      position: 'relative',
      'padding-right': 16,
      'margin-right': lineLength,
      ...styleUtils.conditionalStyle(isLast, 'margin-right', afterLength),
      ...styleUtils.conditionalStyle(!isLast, 'margin-right', lineLength),
      'font-size': size / 2,
      'line-height': `${size / 2}px`,
      ...line,
      ...styleUtils.conditionalStyle(hasDescription, 'top', 0, size / 4),
    };
  },
  'div',
);

const StepDescription = createComponent(
  ({ size, direction, current, seen, theme }) => {
    const unseen = !(current || seen);
    return {
      ...styleUtils.conditionalStyle(
        current,
        'color',
        theme.Stepper.current.description,
      ),
      ...styleUtils.conditionalStyle(
        seen,
        'color',
        theme.Stepper.seen.description,
      ),
      ...styleUtils.conditionalStyle(
        unseen,
        'color',
        theme.Stepper.default.description,
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
      ...styleUtils.conditionalStyle(
        direction !== 'vertical',
        'max-width',
        140,
      ),
      ...styleUtils.conditionalStyle(direction !== 'vertical', 'min-width', 0),
    };
  },
  'div',
);

const StepImpl = createComponent(
  ({ direction, size, isLast, lineLength, afterLength }) => ({
    display: 'flex',
    'flex-direction': 'row',
    ...styleUtils.conditionalStyle(
      direction === 'vertical' && isLast,
      'height',
      size + afterLength,
    ),
    ...styleUtils.conditionalStyle(
      direction === 'vertical' && !isLast,
      'height',
      size + lineLength,
    ),
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
  const {
    title,
    icon,
    index,
    direction,
    size,
    isLast,
    lineLength,
    afterLength,
    seen,
    current,
    description,
  } = props;
  const stepIcon = icon ? React.createElement(icon) : index;

  return (
    <StepImpl
      data-component="Step"
      direction={direction}
      size={size}
      isLast={isLast}
      lineLength={lineLength}
      afterLength={afterLength}
    >
      <StepIcon size={size} seen={seen} current={current}>
        <StepIconNumber seen={seen} current={current}>
          {stepIcon}
        </StepIconNumber>
      </StepIcon>
      <StepTextContainer>
        <StepTitle
          size={size}
          direction={direction}
          isLast={isLast}
          seen={seen}
          current={current}
          hasDescription={!!description}
          lineLength={lineLength}
          afterLength={afterLength}
        >
          {title}
        </StepTitle>
        <StepDescription
          size={size}
          direction={direction}
          current={current}
          seen={seen}
        >
          {description}
        </StepDescription>
      </StepTextContainer>
    </StepImpl>
  );
};

Step.propTypes = {
  /**
   * Order of step
   */
  index: PropTypes.number,
  /**
   * If `true` then step is the last in order
   */
  isLast: PropTypes.bool,
  /**
   * Determine the size of each step
   */
  size: PropTypes.oneOf([24, 36]),
  /**
   * Direction to render the steps
   */
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  /**
   * Title of the step
   */
  title: PropTypes.string,
  /**
   * Description of the step
   */
  description: PropTypes.string,
  /**
   * Determine the length of the line between steps. The length of the line may be longer on horizontal steppers if the description is longer than the title.
   */
  lineLength: PropTypes.number,
  /**
   * Determine the space after the last step of the stepper, since there is no line after the step to create this space.
   */
  afterLength: PropTypes.number,
  /**
   * Icon of the step
   */
  icon: PropTypes.node,
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
  current: false,
  seen: false,
  isLast: false,
};

export default Step;
