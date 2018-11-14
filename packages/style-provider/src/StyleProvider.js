import PropTypes from 'prop-types';
import React, {
  Children,
  Component,
  isValidElement,
  cloneElement,
} from 'react';
import {
  mergeThemes,
  ThemeProvider,
  WithTheme,
} from '@versionone/style-container';
import { Provider as FelaProvider } from 'react-fela';
import createRenderer from './createRenderer';

let singletonRenderer;
const getRenderer = ({ dev, renderer }) => {
  if (renderer) {
    return renderer;
  }
  if (!singletonRenderer) {
    singletonRenderer = createRenderer({ dev });
  }
  return singletonRenderer;
};
class StyleProvider extends Component {
  render() {
    const { dev, children, renderer, theme, ...rest } = this.props;
    const providerRenderer = getRenderer({ dev, renderer });
    const child = Children.only(children);
    return (
      <FelaProvider renderer={providerRenderer}>
        <WithTheme>
          {(ctxTheme = () => {}) => (
            <ThemeProvider theme={mergeThemes(theme, ctxTheme)}>
              {isValidElement(child) ? cloneElement(child, { ...rest }) : child}
            </ThemeProvider>
          )}
        </WithTheme>
      </FelaProvider>
    );
  }
}
StyleProvider.propTypes = {
  /**
   * A single, valid, renderable node.
   */
  children: PropTypes.node,
  /**
   * Enables development friendly CSS classNames when true.
   */
  dev: PropTypes.bool,
  /**
   * Typically only used for testing purposes; provide your own, external renderer.
   */
  // eslint-disable-next-line react/forbid-prop-types
  renderer: PropTypes.object,
  /** Localized theme for a component found in this library. Enables co-locating theme data with each component. */
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object,
};
StyleProvider.defaultProps = {
  dev: false,
  theme: {},
};

export default StyleProvider;
