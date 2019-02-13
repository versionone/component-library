import React, { Component, Children, Fragment } from 'react';
import PropTypes from 'prop-types';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
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
  },
  small: {
    fontSize: '12px',
  },
  xSmall: {
    fontSize: '10px',
  },
};

const getFontStrategy = variant => {
  if (variant === 'mega') {
    return map.mega;
  } else if (variant === 'huge') {
    return map.huge;
  } else if (variant === 'xlarge') {
    return map.xlarge;
  } else if (variant === 'large') {
    return map.large;
  } else if (variant === 'base') {
    return map.base;
  } else if (variant === 'small') {
    return map.small;
  } else if (variant === 'xsmall') {
    return map.xsmall;
  } else if (variant === 'button') {
    return map.button;
  }
};

const getWeight = ({ weight }) => {
  switch (weight) {
    case 'bold':
      return 800;
    case 'light':
      return 300;
    default:
      return weight;
  }
};

const getColor = ({ color }) => {
  switch (color) {
    case 'white':
      return palette.white;
    default:
      return;
  }
};

class Typography extends Component {
  render() {
    const { is, children, variant, ...others } = this.props;

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

      if (typeof child === 'string') {
    const childrenWithTypography = Children.map(children, child => {
        return <TypographyImpl {...others}>{child}</TypographyImpl>;
      } else {
        return child;
      }
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
  is: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span']),
  /** Font Size */
  size: PropTypes.oneOf([
    '10px',
    '12px',
    '14px',
    '16px',
    '20px',
    '24px',
    '56px',
  ]),
  /** Styling Variant */
  variant: PropTypes.oneOf(['huge', 'xlarge', 'mega', 'button']),
  /** Text Transform */
  transform: PropTypes.oneOf(['uppercase']),
  /** Font Weight */
  weight: PropTypes.oneOf([300, 400, 700, 800, 900, 'light', 'bold']),
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

export default Typography;
