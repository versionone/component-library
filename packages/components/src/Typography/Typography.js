import React, { Component, Children, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const fontStrategyMap = {
  mega: {
    fontSize: '56px',
    fontWeight: 800,
    letterSpacing: '-.03em',
  },
  huge: {
    fontSize: '24px',
    fontWeight: 300,
    letterSpacing: '-.025em',
  },
  xLarge: {
    fontSize: '20px',
    letterSpacing: '-.025em',
    fontWeight: 600,
  },
  large: {
    fontSize: '16px',
  },
  button: {
    fontSize: '14px',
    fontWeight: 600,
    letterSpacing: '0.03rem',
    lineHeight: 1.5,
    margin: 0,
    textTransform: 'capitalize',
  },
  base: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.15em',
  },
  small: {
    fontSize: '12px',
  },
  xSmall: {
    fontSize: '10px',
  },
};

class Typography extends Component {
  constructor(props) {
    super(props);
    const { is } = props;

    this.TypographyImpl = createComponent(
      ({ variant, emphasize }) => ({
        fontFamily:
          "'Cabin', 'Cabin Local', -apple-system, system-ui, BlinkMacSystemFont, sans-serif",
        ...(fontStrategyMap[variant] || fontStrategyMap.base),
        ...styleUtils.conditionalStyle(
          variant === 'base' && emphasize,
          'font-weight',
          500,
        ),
      }),
      is,
    );
  }

  render() {
    const { children, variant, emphasize } = this.props;

    const childrenWithTypography = Children.map(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return (
          <this.TypographyImpl variant={variant} emphasize={emphasize}>
            {child}
          </this.TypographyImpl>
        );
      }

      return child;
    });

    return childrenWithTypography;
  }
}

Typography.propTypes = {
  /** Text content */
  children: PropTypes.node,
  /** Tag to be used for element */
  is: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'p']),
  /** Styling Variant */
  variant: PropTypes.oneOf([
    'mega',
    'huge',
    'xLarge',
    'large',
    'base',
    'small',
    'xSmall',
    'button',
  ]),
  /** If true apply a slighty greater font weight than the base */
  emphasize: PropTypes.bool,
};

Typography.defaultProps = {
  is: 'span',
  variant: 'base',
  emphasize: false,
};

export { Typography };
