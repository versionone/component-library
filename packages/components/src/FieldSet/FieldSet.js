import PropTypes from 'prop-types';
import React from 'react';
import { createComponent } from '../StyleProvider';
import { WithBreakpoint, isBreakpointDown, isBreakpointUp } from '../WithBreakpoint';

const FieldSetContainer = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'row',
  }),
  'div',
  ['data-component', 'data-test'],
);

const FieldSetBar = createComponent(
  ({ xs, sm, md, lg, xl, breakpoint, theme }) => {
    const margin =
      (isBreakpointUp('xl', breakpoint) && xl) ||
      (isBreakpointUp('lg', breakpoint) && lg) ||
      (isBreakpointUp('md', breakpoint) && md) ||
      (isBreakpointUp('sm', breakpoint) && sm) ||
      (isBreakpointUp('xs', breakpoint) && xs);

    const width = margin + theme.FieldSet.size;

    return {
      'border-left-width': theme.FieldSet.size,
      'border-left-style': 'solid',
      'border-left-color': theme.FieldSet.color,
      width,
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const FieldSetChildren = createComponent(
  () => ({
    width: '100%',
  }),
  'div',
);

const FieldSet = props => (
  <WithBreakpoint>
    {breakpoint => (
      <FieldSetContainer data-component="FieldSet">
        <FieldSetBar
          breakpoint={breakpoint}
          xs={props.xs}
          sm={props.sm}
          md={props.md}
          lg={props.lg}
          xl={props.xl}
        />
        <FieldSetChildren>{props.children}</FieldSetChildren>
      </FieldSetContainer>
    )}
  </WithBreakpoint>
);

const spacingUnits = [0, 2, 4, 8, 16, 24, 32, 40];

FieldSet.propTypes = {
  /**
   * The form fields the field set groups
   */
  children: PropTypes.node.isRequired,
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
};

FieldSet.defaultProps = {
  xs: 8,
};

export { FieldSet };
