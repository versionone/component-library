import PropTypes from 'prop-types';
import React, { createContext } from 'react';
import mergeThemes from './mergeThemes';
import { defaultTheme } from '../defaultTheme';

const { Consumer, Provider } = createContext(defaultTheme());

const ThemeProvider = ({ children, theme }) => (
  <Consumer>
    {contextTheme => {
      const mergedTheme = mergeThemes(contextTheme, theme);
      return <Provider value={mergedTheme}>{children}</Provider>;
    }}
  </Consumer>
);
ThemeProvider.propTypes = {
  children: PropTypes.node,
  /**
   * Theme to be provided to all components in the sub-tree. If a function, accepts existing theme as only parameter.
   */
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export const WithTheme = Consumer;
export { ThemeProvider };
