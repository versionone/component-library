import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';
import TabContext from './TabContext';

const TabsImpl = createComponent(() => ({}), 'div', [
  'data-component',
  'data-test',
]);

class Tabs extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activeTab: props.defaultActiveTab,
      focusedTab: props.defaultFocusedTab,
    };
  }

  render() {
    const { handleSelection } = this.props;
    const { activeTab, focusedTab } = this.state;
    const context = {
      activeTab,
      focusedTab,
      selectTabByIndex: index => (event) => {
        this.setState({
          activeTab: index,
          focusedTab: index,
        });
        handleSelection(index, event);
      },
      focusTabByIndex: index => () => this.setState({ focusedTab: index }),
    };
    return (
      <TabContext.Provider value={context}>
        <TabsImpl {...this.props} data-component="Tabs" />
      </TabContext.Provider>
    );
  }
}

Tabs.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Index of the active tab before user interaction
   */
  defaultActiveTab: PropTypes.number,
  /**
   * Index of the focused tab before user interaction
   */
  defaultFocusedTab: PropTypes.number,
  /**
   * Function called when a tab is clicked
   */
  handleSelection: PropTypes.func,
};

Tabs.defaultProps = {
  defaultActiveTab: 0,
  defaultFocusedTab: null,
  handleSelection: noop,
};

export { Tabs };
