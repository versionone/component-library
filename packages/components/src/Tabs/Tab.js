import PropTypes from 'prop-types';
import React from 'react';
import { isFunction } from 'underscore';
import { createComponent, StyleProvider } from '../StyleProvider';

const TabImpl = createComponent(
  () => ({
    outline: 'none',
    margin: 0,
    padding: 0,
    background: 'none',
    border: 0,
  }),
  'button',
  [
    'data-component',
    'data-test',
    'data-trackingid',
    'aria-selected',
    'aria-controls',
    'role',
    'id',
    'onClick',
    'tabIndex',
    'disabled',
    'onFocus',
    'onBlur',
  ],
);

const Tab = props => {
  const {
    disabled,
    selected,
    focused,
    children,
    controls,
    id,
    tabIndex,
    handleSelection,
    handleBlur,
    handleFocus,
  } = props;

  const inheritedProps = {
    selected: !disabled && selected,
    disabled,
    focused: !disabled && focused,
  };

  const updatedChildren = isFunction(children)
    ? children(inheritedProps)
    : React.cloneElement(children, inheritedProps);

  return (
    <StyleProvider>
      <TabImpl
        {...props}
        data-component="Tabs.Tab"
        role="tab"
        aria-selected={selected}
        aria-controls={controls}
        id={id}
        tabIndex={tabIndex}
        onClick={handleSelection}
        disabled={disabled}
        focused={focused}
        onBlur={handleBlur}
        onFocus={handleFocus}
      >
        {updatedChildren}
      </TabImpl>
    </StyleProvider>
  );
};

Tab.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * If true the tab is active
   */
  selected: PropTypes.bool,
  /**
   * If true the tab is focused
   */
  focused: PropTypes.bool,
  /**
   * If true the tab is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Content of the tab
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
};

export default Tab;
