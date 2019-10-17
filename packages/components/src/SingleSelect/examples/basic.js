import React from 'react';
import { SingleSelect, renderOptions } from '..';
import { items } from './items';
import { SpacedGroup } from '../../SpacedGroup';

export class Basic extends React.Component {
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

  render() {
    const { selectedItem, items: itemsInState } = this.state;
    return (
      <SpacedGroup direction="vertical" xs={24}>
        <SingleSelect
          hintText="Select your team members"
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          renderOptions={renderOptions}
          selectedItem={selectedItem}
          items={itemsInState}
        />

        <SingleSelect
          hintText="Select your team members"
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          renderOptions={renderOptions}
          selectedItem={selectedItem}
          dropdownWidth="500px"
          dropdownMaxHeight={50}
          items={itemsInState}
          defaultValue={0}
        />
      </SpacedGroup>
    );
  }
}
