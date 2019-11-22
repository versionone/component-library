import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { noop, isFunction } from 'underscore';
import { WithFormFieldState } from '../FormUtils';
import { renderField } from './renderField';

class SingleSelect extends React.Component {
  constructor(props, context) {
    super(props, context);
    const lastSelected =
      props.defaultValue !== null
        ? props.items.find(item => item.value === props.defaultValue)
        : null;
    const defaultValueText = lastSelected ? lastSelected.label : '';
    this.state = {
      lastSelected,
      defaultValueText,
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.stateReducer = this.stateReducer.bind(this);
    this.clearHistory = this.clearHistory.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getItems = this.getItems.bind(this);
    this.handleArrowDown = this.handleArrowDown.bind(this);
    this.handleArrowUp = this.handleArrowUp.bind(this);
  }

  getItems(inputValue) {
    const { items, filter } = this.props;
    const filterByInputValue = filter(inputValue);
    return items.filter(filterByInputValue);
  }

  handleSelection(item) {
    const { onSelect } = this.props;
    this.setState({
      lastSelected: item,
    });
    if (isFunction(onSelect)) {
      onSelect(item);
    }
  }

  clearHistory() {
    this.setState({ lastSelected: null });
  }

  handleBlur(state) {
    const { lastSelected } = this.state;
    //const { items } = this.props;
    const items = this.getItems(state.inputValue);

    const getExactMatch = () =>
      items.find(item => item.label === state.inputValue);

    const getLastMatch = () =>
      lastSelected != null && lastSelected.label.includes(state.inputValue)
        ? lastSelected
        : null;
    const getPartialMatch = () =>
      items.find(item => item.label.includes(state.inputValue));

    const match = (() => {
      const exactMatch = getExactMatch();
      if (exactMatch) return exactMatch;
      const lastMatch = getLastMatch();
      if (lastMatch) return lastMatch;
      const partialMatch = getPartialMatch();
      if (partialMatch) return partialMatch;
      return null;
    })();
    if (match) {
      this.handleSelection(match);
    } else {
      this.clearHistory();
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

  stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
      case Downshift.stateChangeTypes.clickItem:
        this.handleSelection(changes.selectedItem);
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

  render() {
    const {
      fullWidth,
      stretch,
      height,
      hintText,
      dirty,
      error,
      defaultValue,
      tabIndex,
      disableContainment,
      selectedItem,
      inlineEdit,
      success,
      loading,
      disabled,
      focused,
      hovered,
      dropdownHeight,
      dropdownWidth,
      dropdownMaxHeight,
      onFocus,
      onBlur,
      onRemove,
      onCreate,
      renderOptions,
      renderSelection,
    } = this.props;

    const { lastSelected, defaultValueText } = this.state;

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
              onChange={this.handleSelection}
              stateReducer={this.stateReducer}
              itemToString={item => (item ? item.label : '')}
              initialInputValue={defaultValueText}
              selectedItem={selectedItem}
            >
              {({
                getItemProps,
                getInputProps,
                getRootProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                openMenu,
                closeMenu,
              }) =>
                renderField({
                  fullWidth,
                  stretch,
                  height,
                  hintText,
                  tabIndex,
                  success,
                  loading,
                  dirty,
                  error,
                  defaultValue,
                  disableContainment,
                  selectedItem,
                  disabled,
                  onRemove,
                  onCreate,
                  providedDropdownWidth: dropdownWidth,
                  providedDropdownHeight: dropdownHeight,
                  renderOptions,
                  renderSelection,
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
                  lastSelected,
                  getItems: this.getItems,
                  handleSelection: this.handleSelection,
                  getItemProps,
                  getInputProps,
                  getRootProps,
                  getMenuProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  openMenu,
                  closeMenu,
                })
              }
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

SingleSelect.propTypes = {
  /**
   * Set of items that can be selected
   */
  items: PropTypes.arrayOf(ItemPropType),
  /**
   * Currently selected item
   */
  selectedItem: ItemPropType,
  /**
   * Function called when item is unselected
   */
  onRemove: PropTypes.func,
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
  renderOptions: PropTypes.func.isRequired,
  /**
   * Render prop for rendering the selected item
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
   * Explicit height of the dropdown
   */
  dropdownHeight: PropTypes.number,
  /**
   * Maxium height of the dropdown
   */
  dropdownMaxHeight: PropTypes.number,
  /**
    * Filter predicate to apply when input changes occur
    * inputValue => item =>
    item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
  */
  filter: PropTypes.func,

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
   * Indicated if the inline editable field's persistence was successful
   */
  success: PropTypes.bool,
  /**
   * Indicates if the inline editable field is attempting to persist a change
   */
  loading: PropTypes.bool,
  /**
   * Indicates if the field's value has changed
   */
  dirty: PropTypes.bool,
  /**
   * Indicates if the field has an error
   */
  error: PropTypes.string,
  /**
   * Default value to be applied when using as an uncontrolled input.
   */
  defaultValue: ItemValuePropType,
  /**
   * Indicates field is disabled from user input; no events will fire.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates the page focus is on this control.
   */
  focused: PropTypes.bool,
  /**
   * Indicates the control is hovered.
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

SingleSelect.defaultProps = {
  items: [],
  defaultValue: null,
  selectedItem: null,
  onRemove: noop,
  onSelect: noop,
  onCreate: null,
  renderSelection: null,
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

export { SingleSelect };
