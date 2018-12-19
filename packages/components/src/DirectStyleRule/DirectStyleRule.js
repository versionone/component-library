import isString from 'lodash.isstring';
import PropTypes from 'prop-types';
import React from 'react';
import { createComponent } from '../StyleContainer';
import { StyleProvider } from '../StyleProvider';

const DirectStyleRule = ({
  children,
  styleRule,
  passThroughProps,
  ...rest
}) => {
  const Impl = createComponent(styleRule, 'span', passThroughProps);
  const instance = isString(children) ? false : React.Children.only(children);

  return (
    <StyleProvider>
      <Impl
        {...rest}
        {...children.props}
        instance={instance}
        passThroughProps={passThroughProps}
      >
        {instance ? children.props.children : children}
      </Impl>
    </StyleProvider>
  );
};
DirectStyleRule.propTypes = {
  /** Single render-able node that should to have styled applied. */
  children: PropTypes.node.isRequired,
  /** Pass through props. */
  passThroughProps: PropTypes.arrayOf(PropTypes.string),
  /** Style rule to apply to children prop node. */
  styleRule: PropTypes.func.isRequired,
};

DirectStyleRule.defaultProps = {
  passThroughProps: [],
};
export default DirectStyleRule;
