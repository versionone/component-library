import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';

const PanelImpl = createComponent(
  ({ visible }) => ({
    ...styleUtils.conditionalStyle(!visible, 'display', 'none'),
    outline: 'none',
  }),
  'div',
  ['data-component', 'data-test', 'tabIndex', 'role', 'aria-labelledby'],
);

const Panel = props => {
  return (
    <StyleProvider>
      <PanelImpl
        visible={props.visible}
        data-test={props['data-test']}
        data-component="Tabs.Panel"
        tabIndex="-1"
        role="tabpanel"
        aria-labelledby={props.index}
      >
        {props.children}
      </PanelImpl>
    </StyleProvider>
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
