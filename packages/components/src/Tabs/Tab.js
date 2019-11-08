import PropTypes from 'prop-types';
import React from 'react';
import { isFunction } from 'underscore';
import { createComponent } from '../StyleProvider';

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
    'aria-controls',
    'aria-selected',
    'data-component',
    'data-test',
    'data-trackingid',
    'disabled',
    'id',
    'onBlur',
    'onClick',
    'onFocus',
    'role',
    'tabIndex',
    'type',
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
    <TabImpl
      aria-controls={controls}
      aria-selected={selected}
      data-component="Tab"
      disabled={disabled}
      focused={focused}
      id={id}
      onBlur={handleBlur}
      onClick={handleSelection}
      onFocus={handleFocus}
      role="tab"
      tabIndex={tabIndex}
      type="button"
    >
      {updatedChildren}
    </TabImpl>
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
