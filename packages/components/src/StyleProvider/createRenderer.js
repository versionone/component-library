// import beautifier from 'fela-beautifier';
import embedded from 'fela-plugin-embedded';
import fallbackValue from 'fela-plugin-fallback-value';
import important from 'fela-plugin-important';
import prefixer from 'fela-plugin-prefixer';
import unit from 'fela-plugin-unit';
import validator from 'fela-plugin-validator';
import { createRenderer as createFelaRenderer } from 'fela';

const mediaQueries = {};
const mediaQueryOrder = [];

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
    important(),
  ];
  const enhancers = [];

  if (usedOpts.dev === true) {
    plugins.push(validator());
    // enhancers.push(beautifier()); // does Chrome do this already for you?
  }

  return createFelaRenderer({
    plugins,
    enhancers,
    selectorPrefix: 'Z',
    mediaQueryOrder: usedOpts.mediaQueryOrder.map(name =>
      removePrefix(mediaQueries[name]),
    ),
  });
};

export default createRenderer;
