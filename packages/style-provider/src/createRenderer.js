import beautifier from 'fela-beautifier';
import embedded from 'fela-plugin-embedded';
import fallbackValue from 'fela-plugin-fallback-value';
// import namedMediaQuery from 'fela-plugin-named-media-query';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import validator from 'fela-plugin-validator';
import { createRenderer as createFelaRenderer } from 'fela';

const mediaQueries = {
  desktop: `@media (min-width: 64rem)`,
};
const mediaQueryOrder = ['desktop'];

const removePrefix = query => query.replace('@media ', '');

const createRenderer = opts => {
  const usedOpts = {
    dev: false,
    mediaQueries,
    mediaQueryOrder,
    ...opts,
  };
  const plugins = [
    prefixer(),
    fallbackValue(),
    unit(),
    embedded(),
    // namedMediaQuery(mediaQueries),
  ];
  const enhancers = [];

  if (usedOpts.dev === true) {
    plugins.push(validator());
    enhancers.push(beautifier());
  }

  return createFelaRenderer({
    plugins,
    enhancers,
    selectorPrefix: usedOpts.selectorPrefix,
    mediaQueryOrder: usedOpts.mediaQueryOrder.map(name =>
      removePrefix(mediaQueries[name]),
    ),
  });
};

export default createRenderer;
