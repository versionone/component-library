import React, { Component, Children, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createComponent, StyleProvider } from '../StyleProvider';
import { palette } from '../palette';

const map = {
  mega: {
    color: palette.pale,
    fontSize: '56px',
    fontWeight: 800,
    letterSpacing: '-.03em',
  },
  huge: {
    color: palette.forge,
    fontSize: '24px',
    fontWeight: 300,
    letterSpacing: '-.025em',
  },
  xLarge: {
    color: palette.forge,
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
    color: palette.forge,
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

const getFontStrategy = variant => {
  switch (variant) {
    case 'mega':
      return map.mega;
    case 'huge':
      return map.huge;
    case 'xLarge':
      return map.xLarge;
    case 'large':
      return map.large;
    case 'base':
      return map.base;
    case 'small':
      return map.small;
    case 'xSmall':
      return map.xSmall;
    case 'button':
      return map.button;
    default:
      return map.base;
  }
};

class Typography extends Component {
  render() {
    const { is, children, variant } = this.props;

    const fontStrategy = getFontStrategy(variant);

    const TypographyImpl = createComponent(
      () => ({
        fontFamily:
          "'Proxima Nova','Lucida Sans Unicode','Lucida Grande',sans-serif ",
        margin: 0,
        ...fontStrategy,
      }),
      is,
    );

    const childrenWithTypography = Children.map(children, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        return <TypographyImpl >{child}</TypographyImpl>;
      }

      return child;
    });

    return (
      <StyleProvider>
        <Fragment>{childrenWithTypography}</Fragment>
      </StyleProvider>
    );
  }
}

Typography.propTypes = {
  /** Color of the text */
  color: PropTypes.oneOf(['white']),
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
};

Typography.defaultProps = {
  is: 'span',
  variant: 'base',
};

export { Typography };
