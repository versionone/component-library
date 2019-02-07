import PropTypes from 'prop-types';
import React, {
  Children,
  Component,
  isValidElement,
  cloneElement,
} from 'react';
import { Provider as FelaProvider } from 'react-fela';
import createRenderer from './createRenderer';
import mergeThemes from './mergeThemes';
import { ThemeProvider, WithTheme } from './ThemeProvider';
import defaultTheme from '../defaultTheme';

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
    const { dev, children, renderer, ...rest } = this.props;
    const providerRenderer = getRenderer({ dev, renderer });
    const child = Children.only(children);
    return (
      <FelaProvider renderer={providerRenderer}>
        <WithTheme>
          {(ctxTheme = () => {}) => (
            <ThemeProvider theme={mergeThemes(defaultTheme, ctxTheme)}>
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
};
StyleProvider.defaultProps = {
  dev: false,
};

export default StyleProvider;
