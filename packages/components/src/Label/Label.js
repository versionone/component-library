import React from 'react';
import { PropTypes } from 'prop-types';
import { createComponent, StyleProvider } from '../StyleProvider';

const LabelText = createComponent(
  ({ disabled, theme }) => ({
    color: disabled ? theme.Label.disabled.main : 'inherit',
    cursor: disabled && 'not-allowed',
  }),
  'span',
  ['data-component', 'data-test'],
);

const RequiredText = createComponent(
  ({ theme }) => ({
    color: theme.Label.required.main,
  }),
  'span',
);

const Label = props => {
  const { children, disabled, required } = props;
  return (
    <StyleProvider>
      <LabelText
        data-component="Label"
        data-test={props['data-test']}
        disabled={disabled}
      >
        {children} {required && <RequiredText>*</RequiredText>}
      </LabelText>
    </StyleProvider>
  );
};
Label.propTypes = {
  /**
   * Contents of label; typically text
   */
  children: PropTypes.node,
  /**
   * Indicates a disabled field
   */
  disabled: PropTypes.bool,
  /**
   * Indicates a required field
   *  */
  required: PropTypes.bool,
};
Label.defaultProps = {
  disabled: false,
  required: false,
};

export default Label;
