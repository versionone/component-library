import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

const PanelImpl = createComponent(
  ({ visible }) => ({
    ...styleUtils.conditionalStyle(!visible, 'display', 'none'),
    outline: 'none',
    width: '100%',
  }),
  'div',
  ['data-component', 'data-test', 'tabIndex', 'role', 'aria-labelledby'],
);

const Panel = props => {
  const { 'data-test': dataTest, children, index, visible } = props;
  return (
    <PanelImpl
      visible={visible}
      data-test={dataTest}
      data-component="Tabs.Panel"
      tabIndex="-1"
      role="tabpanel"
      aria-labelledby={index}
    >
      {children}
    </PanelImpl>
  );
};

Panel.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

Panel.defaultProps = {};

export default Panel;
