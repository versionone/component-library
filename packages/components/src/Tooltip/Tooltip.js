import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Manager, Reference, Popper } from 'react-popper';
import { createComponent, styleUtils } from '../StyleProvider';
import { Hoverable } from '../Hoverable';
import { PortalContainer } from '../PortalContainer';
import { palette } from '../palette';

const PositionedTooltip = createComponent(
  ({ style, disableContainment, theme }) => ({
    ...style,
    ...styleUtils.conditionalStyle(!disableContainment, 'border-width', 1),
    ...styleUtils.conditionalStyle(
      !disableContainment,
      'border-style',
      'solid',
    ),
    ...styleUtils.conditionalStyle(
      !disableContainment,
      'border-color',
      palette.shuttle,
    ),
    ...styleUtils.conditionalStyle(
      !disableContainment,
      'background-color',
      theme.Tooltip.background,
    ),
    ...styleUtils.conditionalStyle(
      !disableContainment,
      'color',
      theme.Tooltip.color,
    ),
    ...styleUtils.conditionalStyle(!disableContainment, 'border-radius', 6),
  }),
  'div',
  ['data-placement'],
);

const TooltipImpl = createComponent(() => ({}), 'span', [
  'data-component',
  'data-test',
]);

const Tooltip = ({
  'data-test': dataTest,
  disableContainment,
  placement,
  children,
  anchor,
}) => {
  return (
    <TooltipImpl data-component="Tooltip" data-test={dataTest}>
      <Hoverable>
        {({ hovered, bind }) => {
          const popper = (
            <PortalContainer mounted={hovered}>
              <Popper placement={placement} positionFixed modifiers={{}}>
                {({ ref, style, placement: dataPlacement }) => {
                  return (
                    <PositionedTooltip
                      innerRef={ref}
                      style={style}
                      data-placement={dataPlacement}
                      disableContainment={disableContainment}
                    >
                      {children}
                    </PositionedTooltip>
                  );
                }}
              </Popper>
            </PortalContainer>
          );

          return (
            <Manager>
              <Fragment>
                <Reference>
                  {({ ref }) => (
                    <div ref={ref} {...bind}>
                      {anchor}
                    </div>
                  )}
                </Reference>
                {popper}
              </Fragment>
            </Manager>
          );
        }}
      </Hoverable>
    </TooltipImpl>
  );
};

Tooltip.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Contents of the tooltip
   */
  children: PropTypes.node,
  /**
   * When hovered the tooltip is shown
   */
  anchor: PropTypes.node,
  /**
   * Placement of the tooltip relative to its children
   */
  placement: PropTypes.oneOf([
    'bottom-end',
    'bottom-start',
    'bottom',
    'left-end',
    'left-start',
    'left',
    'right-end',
    'right-start',
    'right',
    'top-end',
    'top-start',
    'top',
  ]),
  /**
   * If true the contianer styles are not applied
   */
  disableContainment: PropTypes.bool,
};

Tooltip.defaultProps = {
  disableContainment: false,
};

export { Tooltip };
