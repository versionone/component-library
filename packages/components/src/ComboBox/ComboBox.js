import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';

const ComboBoxImpl = createComponent(
  ({ fullWidth, stretch }) => ({
    ...styleUtils.conditionalStyle(stretch, 'flex', '1 1 auto'),
    ...styleUtils.conditionalStyle(fullWidth, 'flex', '1 1 100%'),
  }),
  'span',
  ['data-test', 'role', 'aria-expanded', 'aria-haspopup', 'aria-labeledby'],
);

const ComboBox = props => (
  <StyleProvider>
    <ComboBoxImpl {...props} />
  </StyleProvider>
);

ComboBox.propTypes = {
  /**
   * Role
   */
  role: PropTypes.string,
  /**
   * If true the set of options are expanded
   */
  'aria-expanded': PropTypes.bool,
  /**
   * Aria has-popup
   */
  'aria-haspop': PropTypes.string,
  /**
   * Aria labelby
   */
  'aria-labelby': PropTypes.string,
};

ComboBox.defaultProps = {
  role: 'combobox',
  'aria-expanded': false,
  'aria-haspopup': 'listbox',
  'aria-labelby': null,
};

export { ComboBox };
