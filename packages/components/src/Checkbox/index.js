import PropTypes from 'prop-types';
import React from 'react';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { StyleProvider, createComponent } from '../StyleProvider';
import { theme } from '../muiTheme';

const Impl = createComponent(
  () => ({
    width: 50,
    margin: 0,
  }),
  'span',
);

const Checkbox = props => (
  <MuiThemeProvider theme={theme}>
    <StyleProvider>
      <Impl {...props}>
        <MaterialCheckbox {...props} />
      </Impl>
    </StyleProvider>
  </MuiThemeProvider>
);

Checkbox.propTypes = {
  /**
   * If true the checkbox is selected
   */
  checked: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  /**
   * Disables the control
   */
  disabled: PropTypes.bool,
  /**
   * Props for the input control
   */
  inputProps: PropTypes.object,
  /**
   * handle change event
   */
  onChange: PropTypes.func,
  /**
   * input type
   */
  type: PropTypes.string,
  /**
   * input value
   */
  value: PropTypes.string,
};

Checkbox.defaultProps = {};

export { Checkbox };
