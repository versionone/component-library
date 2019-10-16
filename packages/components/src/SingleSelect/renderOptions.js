import React from 'react';
import PropTypes from 'prop-types';
import { List } from '../List';

export const renderOptions = ({ getItemProps, items }) => {
  const group = items.map((item, index) => {
    const itemProps = getItemProps({ item, index });
    return (
      <List.Item
        {...itemProps}
        key={item.value}
        selected={itemProps.isSelected || itemProps.isActive}
        isPreviousSelection={itemProps.isPreviousSelection}
      >
        <List.ItemText primary={item.label} secondary={item.email} />
      </List.Item>
    );
  });

  return (
    <List bordered ignoreKeyDown>
      {group}
    </List>
  );
};

const ItemPropType = PropTypes.shape({
  label: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

renderOptions.propTypes = {
  /**
   * Set of items that can be selected
   */
  items: PropTypes.arrayOf(ItemPropType),
  /**
   * function that determines attriutes about a given item relative to the set of items in the single select
   */
  getItemProps: PropTypes.func,
};
