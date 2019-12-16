import React, { Component } from 'react';
import { Avatar } from '../Avatar';
import { Border } from '../Border';
import { Chip } from '../Chip';
import { Divider } from '../Divider';
import { List, ListItem, ListItemText } from '../List';
import { Paper } from '../Paper';
import { items as demoData } from './items';
import { MultiSelect } from './MultiSelect';

export class Example extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items: demoData,
      selectedItems: [1, 2],
    };
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  handleClear() {
    this.setState({ selectedItems: [] });
  }

  handleRemove(id) {
    this.setState(state => ({
      selectedItems: state.selectedItems.filter(x => x !== id),
    }));
  }

  handleSelect(id) {
    this.setState(state => ({
      selectedItems: [...state.selectedItems, id],
    }));
  }

  render() {
    const { items, selectedItems } = this.state;
    const itemsById = items.reduce(
      (map, item) => ({
        ...map,
        [item.value]: item,
      }),
      {},
    );

    const renderOptions = ({ items: filteredItems, getItemProps }) => {
      const group = filteredItems.map((item, index) => {
        const itemProps = getItemProps({ item, index });
        return (
          <ListItem
            key={item.value}
            {...itemProps}
            selected={itemProps.isSelected || itemProps.isActive}
            icon={<Avatar size={36} src={item.href} />}
          >
            <ListItemText primary={item.label} secondary={item.email} />
          </ListItem>
        );
      });
      return (
        <Paper>
          <Border>
            <div>Full control heading</div>
            <Divider heavy />
            <List bordered>{group}</List>
          </Border>
        </Paper>
      );
    };

    const renderSelection = ({ removeItem }) => {
      return selectedItems.map(id => {
        const item = itemsById[id];
        return (
          <Chip
            key={id}
            id={id}
            avatar={<Avatar src={item.href} />}
            onDismiss={() => removeItem(id)}
          >
            {item.label}
          </Chip>
        );
      });
    };
    return (
      <div>
        <MultiSelect
          items={items}
          selectedItems={selectedItems}
          stretch
          hintText="Select your team members"
          clearable
          onClear={this.handleClear}
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          renderSelection={renderSelection}
          renderOptions={renderOptions}
        />
      </div>
    );
  }
}
