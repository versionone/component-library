import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';
import { Typography } from '../Typography';

const Container = createComponent(
  () => ({
    position: 'relative',
  }),
  'div',
  ['data-component', 'data-test'],
);

const Counter = createComponent(
  ({ hasChildren, bordered, color, backgroundColor }) => ({
    height: 20,
    minWidth: 20,
    borderRadius: 10,
    //fontSize: 12,
    lineHeight: 22,
    whiteSpace: 'nowrap',
    padding: `0px 8px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    userSelect: 'none',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: bordered ? color : palette.transparent,
    backgroundColor,
    color,

    ...styleUtils.conditionalStyle(hasChildren, 'position', 'absolute'),
    ...styleUtils.conditionalStyle(hasChildren, 'top', -10),
    ...styleUtils.conditionalStyle(hasChildren, 'right', -10),
  }),
  'span',
);

const Badge = props => {
  const {
    backgroundColor,
    bordered,
    children,
    color,
    count,
    showZero,
    maxCount,
    'data-test': dataTest,
  } = props;
  const showBadge = count > 0 || showZero;
  const badgeCount =
    Boolean(maxCount) && count > maxCount ? `+${maxCount}` : count;

  const hasChildren = React.Children.count(children) > 0;

  const counter = showBadge && (
    <Counter
      hasChildren={hasChildren}
      backgroundColor={backgroundColor}
      color={color}
      bordered={bordered}
    >
      <Typography variant="xSmall">{badgeCount}</Typography>
    </Counter>
  );

  return (
    <Container data-component="Badge" data-test={dataTest}>
      {counter}
      {children}
    </Container>
  );
};

Badge.propTypes = {
  /**
   * Number of notifications
   */
  count: PropTypes.number,
  /**
   * Max count before capping the count
   */
  maxCount: PropTypes.number,
  /**
   * If true show zero otherwise don't render the badge when the count is zero.
   */
  showZero: PropTypes.bool,
  /**
   * Color of the badge count
   */
  color: PropTypes.string,
  /**
   * Background color of the badge
   */
  backgroundColor: PropTypes.string,
  /**
   * If true use the color as the border color
   */
  bordered: PropTypes.bool,
  /**
   * Item (s) to apply the badge
   */
  children: PropTypes.node,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
};

Badge.defaultProps = {
  count: 0,
  maxCount: null,
  showZero: false,
  color: palette.paper,
  backgroundColor: palette.sunset,
  bordered: false,
};

export { Badge };
