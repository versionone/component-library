import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createComponent, StyleProvider } from '../StyleProvider';

const getFontSize = ({ variant }) => {
  switch (variant) {
    case 'huge':
      return '24px';
      break;
    case 'xlarge':
      return '20px';
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
        fontSize: getFontSize({ variant }),
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
