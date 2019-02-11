import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createComponent, StyleProvider } from '../StyleProvider';
import { palette } from '../palette';

const getStyles = ({ variant }) => {
  switch (variant) {
    case 'huge':
      return {
        color: palette.forge,
        fontSize: '24px',
        fontWeight: 300,
        fontFamily:
          "'Proxima Nova','Lucida Sans Unicode','Lucida Grande',sans-serif ",
        letterSpacing: '-.025em',
      };
      break;
    case 'xlarge':
      return {
        fontSize: '20px',
        letterSpacing: '-.025em',
      };
      break;
    default:
      return '12px';
  }
};

class Typography extends Component {
  render() {
    const { variant, is, children } = this.props;

    const TypographyImpl = createComponent(
      ({ variant }) => ({
        ...getStyles({ variant }),
      }),
      is,
      [],
    );

    return (
      <StyleProvider>
        <TypographyImpl variant={variant}>{children}</TypographyImpl>
      </StyleProvider>
    );
  }
}

Typography.propTypes = {
  /** Styling Variant */
  is: PropTypes.oneOf(['h1', 'h2']),
  /** Styling Variant */
  variant: PropTypes.oneOf(['huge', 'xlarge']),
};

Typography.defaultProps = {
  is: 'span',
  variant: 'base',
};

export default Typography;
