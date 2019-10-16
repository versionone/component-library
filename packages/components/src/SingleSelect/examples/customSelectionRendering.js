import React from 'react';
import { SingleSelect, renderOptions } from '..';
import { items } from './items';
import { Chip } from '../../Chip';
import { Link } from '../../Link';
import { SpacedGroup } from '../../SpacedGroup';

export class CustomSelectionRendering extends React.Component {
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
    const renderLink = () => {
      return <Link href={selectedItem.href}>{selectedItem.label}</Link>;
    };

    const renderChip = () => {
      return (
        <Chip size={28} onDismiss={this.handleRemove}>
          {selectedItem.label}
        </Chip>
      );
    };

    return (
      <SpacedGroup direction="vertical" xs={24}>
        <SingleSelect
          hintText="Select your team members"
          selectedItem={selectedItem}
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          renderOptions={renderOptions}
          renderSelection={renderLink}
          items={itemsInState}
        />
        <SingleSelect
          hintText="Select your team members"
          selectedItem={selectedItem}
          onSelect={this.handleSelect}
          onRemove={this.handleRemove}
          renderOptions={renderOptions}
          renderSelection={renderChip}
          items={itemsInState}
        />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </SpacedGroup>
    );
  }
}
