import { combineRules } from 'fela';
import { connect } from 'react-fela';
import createFelaComponent from './createComponent';
import * as styleUtils from './styleUtils';
import { ThemeProvider, WithTheme } from './ThemeProvider';

const createComponent = (rule, type = 'div', passThroughProps = []) =>
  createFelaComponent(
    rule,
    type,
    /* eslint-disable react/forbid-foreign-prop-types */
    type.propTypes
      ? passThroughProps.concat(Object.keys(type.propType))
      : passThroughProps,
    /* eslint-enable react/forbid-foreign-prop-types */
  );

const createComponentStyles = (styleFunctions, component) =>
  connect(styleFunctions)(component);

const reduceProps = (props, reduce) =>
  Object.keys(props)
    .map(key => [key, props[key]])
    .reduce((acc, [key, value]) => reduce(acc, key, value), {});

const filterNoneProps = props =>
  reduceProps(props, (acc, key, value) => {
    if (value == null) return acc;
    acc[key] = value;
    return acc;
  });

const filterStyleProps = props =>
  reduceProps(props, (acc, key, value) => {
    if (key === 'style') return acc;
    acc[key] = value;
    return acc;
  });

export { default as applyStaticStyles } from './applyStaticStyles';
export { default as getComponentDisplayName } from './getComponentDisplayName';
export { default as mergeThemes } from './mergeThemes';
export { default as WithRenderer } from './WithRenderer';
export {
  connect,
  combineRules,
  createComponent,
  createComponentStyles,
  filterNoneProps,
  filterStyleProps,
  reduceProps,
  ThemeProvider,
  styleUtils,
  WithTheme,
};
