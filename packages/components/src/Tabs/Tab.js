import PropTypes from 'prop-types';
import React from 'react';
import { isFunction } from 'underscore';
import { createComponent, StyleProvider } from './../StyleProvider';

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
  const inheritedProps = {
    selected: !props.disabled && props.selected,
    disabled: props.disabled,
    focused: !props.disabled && props.focused,
  };

  const children = isFunction(props.children)
    ? props.children(inheritedProps)
    : React.cloneElement(props.children, inheritedProps);

  return (
    <StyleProvider>
      <TabImpl
        {...props}
        data-component="Tabs.Tab"
        role="tab"
        aria-selected={props.selected}
        aria-controls={props.controls}
        id={props.id}
        tabIndex={props.tabIndex}
        onClick={props.handleSelection}
        disabled={props.disabled}
        focused={props.focused}
        onBlur={props.handleBlur}
        onFocus={props.handleFocus}
      >
        {children}
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
