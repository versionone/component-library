import React from 'react';
import { SingleSelect, renderOptions } from '..';
import { items } from './items';
import { SpacedGroup } from '../../SpacedGroup';

export class CreateableExample extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      items,
      selectedItem: null,
    };
  }

  handleSelect = selection => {
    this.setState(state => ({
      selectedItem: state.items.find(item => item.value === selection.value),
    }));
  };

  handleRemove = () => {
    this.setState({
      selectedItem: null,
    });
  };

  handleCreate = item => {
    this.setState({
      items: [...items, item],
      selectedItem: item,
    });
  };

  render() {
    const { selectedItem, items: itemsInState } = this.state;
    return (
      <SpacedGroup direction="vertical">
        <SingleSelect
          fullWidth
          hintText="When you're done typing click enter"
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          onCreate={this.handleCreate}
          selectedItem={selectedItem}
          renderOptions={renderOptions}
          items={itemsInState}
        />
      </SpacedGroup>
    );
  }
}
