import PropTypes from 'prop-types';
import React from 'react';
import TabContext from './TabContext';

const Panels = props => {
  const renderPanels = value => {
    return React.Children.map(props.children, (child, index) => {
      return React.cloneElement(child, {
        key: index,
        id: `${index}-tab`,
        visible: parseInt(value.activeTab) === index,
      });
    });
  };

  return <TabContext.Consumer>{renderPanels}</TabContext.Consumer>;
};

Panels.propTypes = {
  /**
   * Collection of TabsPanel that contain content
   */
  children: PropTypes.node,
};

export default Panels;
