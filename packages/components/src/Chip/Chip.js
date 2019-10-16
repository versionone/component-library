import { isFunction } from 'underscore';
import PropTypes from 'prop-types';
import React from 'react';
import { CloseIcon } from '@versionone/icons';
import { createComponent, styleUtils } from '../StyleProvider';
import { IconButton } from '../Button';
import { EventBoundary } from '../EventBoundary';
import { HoverIntersection, HoverIntersectionExclude } from '../HoverIntersection';

const buildStyles = ({ hovered, onClick, size, clamped, outlined, theme }) => {
  const activityStyles = onClick
    ? {
        cursor: 'pointer',
        ':focus': {
          'background-color': theme.Chip.focused,
          ...theme.focused,

          borderRadius: size,
        },
      }
    : {};

  return {
    ...styleUtils.conditionalStyle(clamped, 'max-width', 200),
    padding: 0,
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    height: size,
    'border-width': 1,
    'border-style': 'solid',
    ...styleUtils.conditionalStyle(
      outlined,
      'background-color',
      'transparent',
      theme.Chip.main,
    ),
    ...styleUtils.conditionalStyle(
      hovered && Boolean(onClick),
      'background-color',
      theme.Chip.focused,
    ),
    ...styleUtils.conditionalStyle(
      outlined,
      'border-color',
      'rgba(0, 0, 0, 0.23)',
      'transparent',
    ),
    'border-radius': size,
    ...activityStyles,
  };
};

const passThroughProps = [
  'data-component',
  'data-test',
  'onClick',
  'onMouseEnter',
  'onMouseLeave',
];

const ActionlessImpl = createComponent(buildStyles, 'div', passThroughProps);

const ActionImpl = createComponent(buildStyles, 'button', passThroughProps);

const ChipTextContainer = createComponent(
  ({ clamped }) => ({
    ...styleUtils.margin(0, 8),
    ...styleUtils.conditionalStyle(clamped, 'overflow', 'hidden'),
    ...styleUtils.conditionalStyle(clamped, 'white-space', 'nowrap'),
    ...styleUtils.conditionalStyle(clamped, 'text-overflow', 'ellipsis'),
  }),
  'span',
);

const DismissWrapper = createComponent(
  () => ({
    'margin-right': 2,
    display: 'flex',
    'align-items': 'center',
  }),
  'div',
);

const InternalChip = props => {
  const avatar =
    Boolean(props.avatar) &&
    React.cloneElement(props.avatar, {
      size: props.size,
    });

  const dismiss = props.onDismiss && (
    <DismissWrapper>
      <EventBoundary onClick={props.onDismiss}>
        {({ onClick }) => (
          <HoverIntersectionExclude>
            {({ bind }) => (
              <IconButton
                {...bind}
                onClick={onClick}
                size={props.size - 6}
                icon={CloseIcon}
                title="dismiss"
              />
            )}
          </HoverIntersectionExclude>
        )}
      </EventBoundary>
    </DismissWrapper>
  );

  const Impl = isFunction(props.onClick) ? ActionImpl : ActionlessImpl;

  return (
    <Impl {...props} data-component="Chip">
      {avatar}
      <ChipTextContainer clamped={props.clamped}>
        {props.children}
      </ChipTextContainer>
      {dismiss}
    </Impl>
  );
};

const Chip = props => {
  return (
    <HoverIntersection>
      {({ bind, hovered }) => (
        <InternalChip {...props} {...bind} hovered={hovered} />
      )}
    </HoverIntersection>
  );
};

Chip.propTypes = {
  /**
   * Main text
   */
  children: PropTypes.node,
  /**
   * De-emphasized chip
   */
  outlined: PropTypes.bool,
  /**
   * Avatar that helps identify the chip
   */
  avatar: PropTypes.node,
  /**
   * Handle primary selection action
   */
  onClick: PropTypes.func,
  /**
   * Handle removal of the chip
   */
  onDismiss: PropTypes.func,
  /**
   * Size of avatar and dismiss icon button
   */
  size: PropTypes.number,
  /**
   * Ensure the chip has a fixed width
   */
  clamped: PropTypes.bool,
};

Chip.defaultProps = {
  outlined: false,
  avatar: null,
  onClick: null,
  onDismiss: null,
  size: 32,
  clamped: false,
};

export { Chip };
