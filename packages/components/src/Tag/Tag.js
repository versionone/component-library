import PropTypes from 'prop-types';
import React from 'react';
import { toRgbaString, darken } from '@andrew-codes/color-functions';
import { CloseIcon } from '@versionone/icons';
import { createComponent, styleUtils, WithTheme } from '../StyleProvider';
import { EventBoundary } from '../EventBoundary';
import { Link } from '../Link';

const Impl = createComponent(
  ({ size, theme }) => {
    return {
      display: 'flex',
      'flex-direction': 'row',
      'align-items': 'center',
      height: size,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      'border-width': 1,
      'border-style': 'solid',
      'border-color': toRgbaString(darken(theme.Tag.backgroundColor, 0.5)),
      'background-color': theme.Tag.backgroundColor,
      'border-radius': size,
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const TagTextContainer = createComponent(
  ({ clamped, color }) => ({
    ...styleUtils.conditionalStyle(clamped, 'max-width', 200),
    ...styleUtils.margin(0, 8),
    ...styleUtils.conditionalStyle(clamped, 'overflow', 'hidden'),
    ...styleUtils.conditionalStyle(clamped, 'white-space', 'nowrap'),
    ...styleUtils.conditionalStyle(clamped, 'text-overflow', 'ellipsis'),
    ...styleUtils.conditionalStyle(color, 'color', color),
  }),
  'span',
);

const DismissWrapper = createComponent(
  ({ size, theme }) => ({
    'margin-right': 4,
    padding: 4,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: toRgbaString(darken(theme.Tag.backgroundColor, 0.5)),
    backgroundColor: 'transparent',
    border: 'none',
    minHeight: size,
    minWidth: size,
    height: size,
    width: size,
    ':focus': {
      ...theme.focused,
      borderRadius: '50%',
    },
  }),
  'button',
  ['data-trackingid', 'onClick', 'tabIndex'],
);

const Tag = ({
  onDismiss,
  size,
  href,
  children,
  clamped,
  'data-test': dataTest,
  'data-trackingid': dataTrackingid,
}) => {
  const dismiss = onDismiss && (
    <EventBoundary onClick={onDismiss}>
      {bind => (
        <DismissWrapper
          {...bind}
          tabIndex="0"
          size={size - 8}
          data-trackingid={dataTrackingid}
        >
          <CloseIcon size={8} title="dismiss" color="currentColor" />
        </DismissWrapper>
      )}
    </EventBoundary>
  );

  const boundText = (
    <WithTheme>
      {theme => {
        const text = href ? (
          <Link href={href} color={theme.Tag.color}>
            {children}
          </Link>
        ) : (
          children
        );
        return (
          <TagTextContainer clamped={clamped} color={theme.Tag.color}>
            {text}
          </TagTextContainer>
        );
      }}
    </WithTheme>
  );

  return (
    <Impl size={size} data-test={dataTest} data-component="Tag">
      {boundText}
      {dismiss}
    </Impl>
  );
};

Tag.propTypes = {
  /**
   * Link text
   */
  children: PropTypes.node,
  /**
   * Link href
   */
  href: PropTypes.string,
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
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
};

Tag.defaultProps = {
  onDismiss: null,
  size: 28,
  clamped: false,
  href: null,
};

export { Tag };
