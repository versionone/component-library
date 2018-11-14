import mergeWith from 'lodash.mergewith';
import invariant from 'tiny-invariant';

const customizeMerge = (objValue, srcValue, key) => {
  if (Array.isArray(objValue)) {
    invariant(
      Array.isArray(srcValue),
      `Cannot merge values for ${key}; one is an array and one is not. Did you mean for both of them to be an array?`,
    );
    return objValue.concat(srcValue);
  }
  return undefined;
};

const createDeriveThemeValue = baseTheme => theme => {
  if (typeof theme === 'function') return theme(baseTheme);
  if (typeof theme === 'object') return theme;

  throw new Error('Theme must be either a function or an object');
};

const mergeThemes = (baseTheme, ...themes) => {
  const deriveThemeValue = createDeriveThemeValue(baseTheme);
  return (themes || []).reduce(
    (acc, theme) => mergeWith(acc, deriveThemeValue(theme), customizeMerge),
    baseTheme,
  );
};

export default mergeThemes;
