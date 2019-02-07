import PropTypes from 'prop-types';
import React from 'react';
import MaterialRadio from '@material-ui/core/Radio';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { theme } from '../muiTheme';

const Radio = props => (
  <MuiThemeProvider theme={theme}>
    <MaterialRadio {...props} />
  </MuiThemeProvider>
);

Radio.propTypes = {
  /**
   * If true the switch is on
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

Radio.defaultProps = {};

export default Radio;
