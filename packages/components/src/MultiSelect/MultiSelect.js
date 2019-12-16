import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { isFunction, noop } from 'underscore';
import { WithFormFieldState } from '../FormUtils';
import { renderField } from './renderField';

class MultiSelect extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
    this.stateReducer = this.stateReducer.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.handleArrowDown = this.handleArrowDown.bind(this);
    this.handleArrowUp = this.handleArrowUp.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.clickItem:
      case Downshift.stateChangeTypes.keyDownEnter:
        this.handleSelection(changes.selectedItem.value, null);
        return {
          isOpen: false,
          inputValue: changes.selectedItem.label,
        };
      case Downshift.stateChangeTypes.blurInput:
        return this.handleBlur(state);
      case Downshift.stateChangeTypes.keyDownArrowUp:
        return this.handleArrowUp(state);
      case Downshift.stateChangeTypes.keyDownArrowDown:
        return this.handleArrowDown(state);
      case Downshift.stateChangeTypes.keyDownEscape:
        return {
          isOpen: false,
        };
      default:
        return changes;
    }
  }

  getItems(inputValue) {
    const { items, filter } = this.props;
    const filterByInputValue = filter(inputValue);
    return items.filter(filterByInputValue);
  }

  handleSelection(selectedId, event) {
    const { selectedItems } = this.props;
    const alreadySelected = selectedItems.includes(selectedId);
    const action = alreadySelected ? this.removeItem : this.addItem;

    action(selectedId, event);

    this.clearInput();
  }

  removeItem(itemId, event) {
    const { onRemove } = this.props;
    if (isFunction(onRemove)) {
      onRemove(itemId, event);
    }
  }

  addItem(itemId, event) {
    const { onSelect } = this.props;
    if (isFunction(onSelect)) {
      onSelect(itemId, event);
    }
  }

  handleBlur(state) {
    const items = this.getItems(state.inputValue);

    const getExactMatch = () =>
      items.find(item => item.label === state.inputValue);

    const getPartialMatch = () =>
      items.find(item => item.label.includes(state.inputValue));

    const match = (() => {
      const exactMatch = getExactMatch();
      if (exactMatch) return exactMatch;
      const partialMatch = getPartialMatch();
      if (partialMatch) return partialMatch;
      return null;
    })();
    if (match) {
      this.handleSelection(match);
    }
    return {
      isOpen: false,
      inputValue: match ? match.label : '',
    };
  }

  handleArrowDown(state) {
    const items = this.getItems(state.inputValue);
    const currentIndex = state.highlightedIndex;
    const max = items.length;
    const nextIndex = (() => {
      const start = currentIndex + 1 >= max ? 0 : currentIndex + 1;
      for (let i = start; i < max; i++) {
        return i;
      }
      return null;
    })();
    return {
      highlightedIndex: nextIndex,
    };
  }

  handleArrowUp(state) {
    const items = this.getItems(state.inputValue);
    const currentIndex = state.highlightedIndex;
    const max = items.length;
    const nextIndex = (() => {
      const start = currentIndex - 1 < 0 ? max - 1 : currentIndex - 1;
      for (let i = start; i >= 0; i--) {
        return i;
      }
      return null;
    })();
    return {
      highlightedIndex: nextIndex,
    };
  }

  getStateAndHelpers(downshift) {
    const { selectedItems } = this.props;
    const getItemProps = args => {
      const { item, index } = args;
      return {
        ...downshift.getItemProps(args),
        onClick: event => this.handleSelection(item.value, event),
        isActive: downshift.highlightedIndex === index,
        isSelected: selectedItems.includes(item.value),
      };
    };

    return {
      ...downshift,
      ...this.state,
      getItemProps,
      handleSelection: this.handleSelection,
      removeItem: this.removeItem,
      addItem: this.addItem,
    };
  }

  handleInputValueChange(event) {
    if (event || event === '') {
      this.setState({ inputValue: event });
    }
  }

  clearInput() {
    this.setState({ inputValue: '' });
  }

  render() {
    const {
      'data-test': dataTest,
      inlineEdit,
      fullWidth,
      stretch,
      error,
      loading,
      dirty,
      success,
      focused,
      hovered,
      tabIndex,
      disabled,
      dropdownMaxHeight,
      dropdownWidth,
      dropdownHeight,
      disableContainment,
      onFocus,
      onBlur,
      height,
      hintText,
      selectedItems,
      renderSelection,
      renderOptions,
      onClear,
      onCreate,
    } = this.props;

    return (
      <WithFormFieldState
        inlineEdit={inlineEdit}
        focused={focused}
        hovered={hovered}
        dropdownMaxHeight={dropdownMaxHeight}
        dropdownWidth={dropdownWidth}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {({
          dropdownMaxHeight: calculatedDropdownMaxHeight,
          dropdownWidth: calculatedDropdownWidth,
          onBlur: handleBlur,
          onFocus: handleFocus,
          calculateDropdownDimensions,
          focused: calculatedFocused,
          onMouseEnter,
          onMouseLeave,
          hovered: calculatedHovered,
          inputContainerRef,
          inputRef,
        }) => {
          return (
            <Downshift
              disabled={disabled}
              stateReducer={this.stateReducer}
              selectedItem={selectedItems}
              itemToString={noop}
            >
              {downshift => {
                return renderField({
                  ...this.getStateAndHelpers(downshift),

                  'data-test': dataTest,
                  inlineEdit,
                  fullWidth,
                  stretch,
                  error,
                  loading,
                  dirty,
                  success,
                  tabIndex,
                  disabled,
                  dropdownHeight,
                  disableContainment,
                  height,
                  hintText,
                  selectedItems,
                  renderSelection,
                  renderOptions,
                  onClear,
                  onCreate,

                  dropdownMaxHeight: calculatedDropdownMaxHeight,
                  dropdownWidth: calculatedDropdownWidth,
                  onBlur: handleBlur,
                  onFocus: handleFocus,
                  calculateDropdownDimensions,
                  focused: calculatedFocused,
                  onMouseEnter,
                  onMouseLeave,
                  hovered: calculatedHovered,
                  inputContainerRef,
                  inputRef,
                  getItems: this.getItems,
                  clearInput: this.clearInput,
                });
              }}
            </Downshift>
          );
        }}
      </WithFormFieldState>
    );
  }
}

const ItemValuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);
const ItemPropType = PropTypes.shape({
  label: PropTypes.string,
  value: ItemValuePropType,
});

MultiSelect.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Array of item ids.
   */
  selectedItems: PropTypes.arrayOf(ItemValuePropType),
  /**
   * Set of items that can be selected
   */
  items: PropTypes.arrayOf(ItemPropType),
  /**
  * Filter predicate to apply when input changes occur
  * inputValue => item =>
  item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
  */
  filter: PropTypes.func,
  /**
   * Function called when item is unselected
   */
  onRemove: PropTypes.func,
  /**
   * Function called when clearing all selected items
   */
  onClear: PropTypes.func,
  /**
   * Function called when a selection is made
   */
  onSelect: PropTypes.func,
  /**
   * Function called that creates a new item when seleting an value that is not yet an option.
   */
  onCreate: PropTypes.func,
  /**
   * Render prop for rendering the options
   */
  renderOptions: PropTypes.func,
  /**
   * Render prop for rendering the selection
   */
  renderSelection: PropTypes.func,
  /**
   * If true don't wrap the menu in Paper
   */
  disableContainment: PropTypes.bool,
  /**
   * Width of the dropdown (includes units pxs, %, rems, etc)
   */
  dropdownWidth: PropTypes.string,
  /**
   * Maxium height of the dropdown
   */
  dropdownMaxHeight: PropTypes.number,

  /**********************
  Common InputField Props
  **********************/

  /**
   * Indicates the tab order within the document.
   */
  tabIndex: PropTypes.string,
  /**
   * Inline Editable
   */
  inlineEdit: PropTypes.bool,
  /**
   * Indicates if the field's value has changed
   */
  dirty: PropTypes.bool,
  /**
   * Indicates if the field's value is in the process of being persisted
   */
  loading: PropTypes.bool,
  /**
   * Indicates if the field's value has successfully been persisted
   */
  success: PropTypes.bool,
  /**
   * Indicates if the field has an error
   */
  error: PropTypes.string,
  /**
   * Default value to be applied when using as an uncontrolled input.
   */
  defaultValue: PropTypes.string,
  /**
   * Indicates field is disabled from user input; no events will fire.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates the page focus is this text field.
   */
  focused: PropTypes.bool,
  /**
   * Indicates the text field is hovered
   */
  hovered: PropTypes.bool,
  /**
   * Indicates the input to take the full width of its parent.
   * See stretch, (when strech is true this fullWidth is overriden)
   */
  fullWidth: PropTypes.bool,
  /**
   * Indicates the input to take the remaining width of its parent.
   * See fullWidth
   */
  stretch: PropTypes.bool,
  /**
   * Overall height of the text field.
   */
  height: PropTypes.number,
  /**
   * Placeholder (hint) text.
   */
  hintText: PropTypes.string,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
};

MultiSelect.defaultProps = {
  items: [],
  selectedItems: [],
  onRemove: noop,
  onClear: null,
  onSelect: noop,
  onCreate: null,
  renderOptions: noop,
  renderSelection: noop,
  disableContainment: false,
  dropdownWidth: null,
  dropdownMaxHeight: 600,
  filter: (inputValue = '') => item =>
    item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
  /**********************
   Common InputField Props
   **********************/
  tabIndex: '0',
  stretch: false,
  fullWidth: false,
  height: 32,
  hintText: '',
  disabled: false,
  dirty: false,
  focused: false,
  inlineEdit: false,
  error: '',
  onFocus: noop,
  onBlur: noop,
};

export { MultiSelect };
