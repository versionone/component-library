import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { WithBreakpoint, isBreakpointUp } from '../WithBreakpoint';

const HORIZONTAL = 'horizontal';
const VERTICAL = 'vertical';

const getMargin = ({ breakpoint, xs, sm, md, lg, xl }) => {
  if (isBreakpointUp('xl', breakpoint) && xl) return xl;
  if (isBreakpointUp('lg', breakpoint) && lg) return lg;
  if (isBreakpointUp('md', breakpoint) && md) return md;
  if (isBreakpointUp('sm', breakpoint) && sm) return sm;
  return xs;
};

const buildStyles = ({
  center,
  stretch,
  justify,
  breakpoint,
  direction,
  disableGutter,
  xs,
  sm,
  md,
  lg,
  xl,
}) => {
  const isHorizontal = direction === HORIZONTAL;
  const margin = getMargin({ breakpoint, xs, sm, md, lg, xl });

  return {
    display: 'flex',
    'flex-direction': isHorizontal ? 'row' : 'column',
    flexWrap: isHorizontal ? 'wrap' : 'nowrap',
    ...styleUtils.conditionalStyle(center, 'align-items', 'center'),
    ...styleUtils.conditionalStyle(justify, 'justify-content', justify),
    ...styleUtils.conditionalStyle(stretch, 'flex-grow', '1'),
    '> *': {
      ...styleUtils.margin(margin),
      ...styleUtils.conditionalStyle(
        disableGutter && !isHorizontal,
        'margin-left',
        0,
      ),
      ...styleUtils.conditionalStyle(
        disableGutter && !isHorizontal,
        'margin-right',
        0,
      ),
    },
    '> *:first-child': {
      ...styleUtils.conditionalStyle(
        disableGutter && isHorizontal,
        'margin-left',
        0,
      ),
    },
    '> *:last-child': {
      ...styleUtils.conditionalStyle(
        disableGutter && isHorizontal,
        'margin-right',
        0,
      ),
    },
  };
};

const passThroughProps = [
  'data-component',
  'data-test',
  'data-trackingid',
  'htmlFor',
];

const SpacedGroup = props => {
  const { is } = props;

  const SpacedGroupImpl = createComponent(buildStyles, is, passThroughProps);

  return (
    <WithBreakpoint>
      {breakpoint => (
        <SpacedGroupImpl
          xs={props.xs}
          sm={props.sm}
          md={props.md}
          lg={props.lg}
          xl={props.xl}
          disableGutter={props.disableGutter}
          center={props.center}
          stretch={props.stretch}
          is={props.is}
          direction={props.direction}
          breakpoint={breakpoint}
          data-component="SpacedGroup"
          data-test={props['data-test']}
          data-trackingid={props['data-trackingid']}
          htmlFor={props.htmlFor}
        >
          {props.children}
        </SpacedGroupImpl>
      )}
    </WithBreakpoint>
  );
};

const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

SpacedGroup.propTypes = {
  /**
   * Set components to equally space.
   */
  children: PropTypes.node,
  /**
   * Set the direction elements should be rendered.
   */
  direction: PropTypes.oneOf([VERTICAL, HORIZONTAL]),
  /*
   * Turn on vertical or horizontal centering of items
   */
  center: PropTypes.bool,
  /**
   * If true stretch to fill space
   */
  stretch: PropTypes.bool,
  /**
   * Set the amount to space to apply between elements when the screen is phone and up
   */
  xs: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet portrait and up
   */
  sm: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is tablet landscape and up
   */
  md: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is small desktop and up
   */
  lg: PropTypes.oneOf(spacingUnits),
  /**
   * Set the amount to space to apply between elements when the screen is large desktop and up
   */
  xl: PropTypes.oneOf(spacingUnits),
  /**
   * Removes the margin from the frist and last child
   */
  disableGutter: PropTypes.bool,
  /**
   * The underlying DOM element
   */
  is: PropTypes.oneOf(['div', 'label']),
  /**
   * For element
   */
  htmlFor: PropTypes.string,
};

SpacedGroup.defaultProps = {
  direction: HORIZONTAL,
  xs: 8,
  center: false,
  stretch: false,
  disableGutter: false,
  is: 'div',
  htmlFor: null,
};

export { SpacedGroup };
