import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '../StyleProvider';
import { createComponent, styleUtils } from '../StyleContainer';

const Impl = createComponent(
  ({ theme }) => {
    return {

    };
  },
  'div',
);

const PLACEHOLDER = props => (
  <StyleProvider>
    <Impl {...props} />
  </StyleProvider>
);

PLACEHOLDER.propTypes = {
  /**
   * @deprecated do not use this fake prop
   */
  fake: PropTypes.string,
};

PLACEHOLDER.defaultProps = {

};

PLACEHOLDER.themeDefinition = {
  color: PropTypes.string.isRequired,
};

PLACEHOLDER.defaultThemeValues = {
  color: 'blue',
};

export default PLACEHOLDER;
