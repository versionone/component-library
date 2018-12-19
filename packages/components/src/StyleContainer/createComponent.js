import extractPassThroughProps from 'fela-bindings/lib/extractPassThroughProps';
import invariant from 'tiny-invariant';
import PropTypes from 'prop-types';
import React, {
  createElement as reactCreateElement,
  cloneElement as reactCloneElement,
} from 'react';
import resolvePassThrough from 'fela-bindings/lib/resolvePassThrough';
import getComponentDisplayName from './getComponentDisplayName';
import { WithTheme } from './ThemeProvider';

const createComponentFactory = ({
  createElement,
  cloneElement,
  contextTypes,
}) => (rule, type, passThroughProps) => {
  const componentName = getComponentDisplayName(type);
  const FelaComponent = ({ children, ...ruleProps }, { renderer }) => (
    <WithTheme>
      {theme => {
        if (!renderer) {
          throw new Error(
            "createComponent() can't render styles without the renderer in the context. Wrap the root of your app with <StyleProvider />.",
          );
        }

        if (!theme) {
          throw new Error(
            "createComponent() can't render styles without the theme in the context. Wrap the root of your app with <StyleProvider />.",
          );
        }

        const resolvedPassThrough = [
          ...resolvePassThrough(passThroughProps, ruleProps),
        ];

        const rulePropsWithTheme = {
          ...ruleProps,
          theme: theme || {},
        };

        invariant(
          !rulePropsWithTheme.className,
          `You cannot restyle Fela component ${componentName}`,
        );

        const componentProps = extractPassThroughProps(
          resolvedPassThrough,
          ruleProps,
        );

        if (rulePropsWithTheme.style) {
          componentProps.style = ruleProps.style;
        }

        componentProps.className = renderer.renderRule(
          rule,
          rulePropsWithTheme,
        );

        if (rulePropsWithTheme.id) {
          componentProps.id = rulePropsWithTheme.id;
        }

        if (rulePropsWithTheme.innerRef) {
          componentProps.ref = rulePropsWithTheme.innerRef;
        }

        if (rulePropsWithTheme.instance) {
          return cloneElement(rulePropsWithTheme.instance, componentProps);
        }

        const customType = rulePropsWithTheme.is || type;

        return createElement(customType, componentProps, children);
      }}
    </WithTheme>
  );

  /* eslint-disable react/forbid-foreign-prop-types */
  if (type.propTypes) {
    FelaComponent.propTypes = type.propTypes;
    FelaComponent.propTypes.className = PropTypes.string;
  }
  /* eslint-enable react/forbid-foreign-prop-types */

  if (contextTypes) {
    FelaComponent.contextTypes = contextTypes;
  }

  FelaComponent.displayName = `${componentName}FelaWrapper`;
  FelaComponent._isFelaComponent = true;

  return FelaComponent;
};

export default createComponentFactory({
  createElement: reactCreateElement,
  contextTypes: {
    renderer: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    theme: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  },
  cloneElement: reactCloneElement,
});
