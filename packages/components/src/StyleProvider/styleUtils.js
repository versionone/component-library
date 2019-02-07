const createSpacingExpansion = spacingProperty => (value, ...values) => {
  if (values.length === 0) {
    return {
      [`${spacingProperty}Bottom`]: value,
      [`${spacingProperty}Left`]: value,
      [`${spacingProperty}Right`]: value,
      [`${spacingProperty}Top`]: value,
    };
  }
  if (values.length === 1) {
    return {
      [`${spacingProperty}Bottom`]: value,
      [`${spacingProperty}Left`]: values[0],
      [`${spacingProperty}Right`]: values[0],
      [`${spacingProperty}Top`]: value,
    };
  }
  if (values.length === 2) {
    return {
      [`${spacingProperty}Bottom`]: values[1],
      [`${spacingProperty}Left`]: values[0],
      [`${spacingProperty}Right`]: values[0],
      [`${spacingProperty}Top`]: value,
    };
  }
  return {
    [`${spacingProperty}Bottom`]: values[1],
    [`${spacingProperty}Left`]: values[2],
    [`${spacingProperty}Right`]: values[0],
    [`${spacingProperty}Top`]: value,
  };
};
export const conditionalStyle = (condition, style, value, defaultValue) => {
  if (!condition) {
    if (defaultValue) return { [style]: defaultValue };

    return {};
  }
  return {
    [style]: value,
  };
};
export const conditionalStyles = (condition, styles, defaultValue = {}) => {
  if (!condition) {
    return defaultValue;
  }
  return styles;
};

export const margin = createSpacingExpansion('margin');
export const padding = createSpacingExpansion('padding');
