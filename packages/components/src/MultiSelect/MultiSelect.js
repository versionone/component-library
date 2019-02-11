import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { isFunction, noop } from 'underscore';
import { StyleProvider } from '../StyleProvider';
import { Arrow } from '../Arrow';
import {
  InputFieldContainer,
  InputStateIcon,
  InputField,
  WithFormFieldState,
} from '../FormUtils';
import { SpacedGroup } from '../SpacedGroup';
import { ComboBox } from '../ComboBox';
import { IconButton } from '../Button';
import { CloseIcon } from '../Icons';
import { Menu } from '../Menu';

class MultiDownshift extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.stateReducer = this.stateReducer.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.removeAll = this.removeAll.bind(this);
  }

  stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
        this.handleSelection(changes.selectedItem.id, event);
        return {};
      default:
        return changes;
    }
  }

  handleSelection(selectedId, event) {
    const alreadySelected = this.props.selectedItems.includes(selectedId);
    const action = alreadySelected ? this.removeItem : this.addItem;

    action(selectedId, event);

    this.props.clearInput();
  }

  removeItem(itemId, event) {
    const onRemove = this.props.onRemove;
    isFunction(onRemove) && onRemove(itemId, event);
  }

  addItem(itemId, event) {
    const onSelect = this.props.onSelect;
    isFunction(onSelect) && onSelect(itemId, event);
  }

  removeAll(event) {
    const onClear = this.props.onClear;
    const ids = this.props.selectedItems;
    isFunction(onClear) && onClear(ids, event);
  }

  getStateAndHelpers(downshift) {
    const getItemProps = args => {
      const { item, index } = args;

      return {
        ...downshift.getItemProps(args),
        onClick: event => this.handleSelection(item.id, event),
        isActive: downshift.highlightedIndex == index,
        isSelected: this.props.selectedItems.includes(item.id),
      };
    };

    return {
      ...downshift,
      ...this.state,
      getItemProps,
      handleSelection: this.handleSelection,
      removeItem: this.removeItem,
      addItem: this.addItem,
      removeAll: this.removeAll,
    };
  }

  render() {
    const { children, ...props } = this.props;
    return (
      <Downshift
        {...props}
        stateReducer={this.stateReducer}
        selectedItem={null}
        itemToString={noop}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
    };
    this.handleInputValueChange = this.handleInputValueChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleInputValueChange(event) {
    if (event || event === '') this.setState({ inputValue: event });
  }

  clearInput() {
    this.setState({ inputValue: '' });
  }

  render() {
    const {
      'data-test': dataTest,
      selectedItems,
      renderSelection,
      renderOptions,
      hintText,
      height,
      fullWidth,
      stretch,
      dirty,
      disabled,
      error,
      success,
      loading,
      inlineEdit,
      tabIndex,
      onCreate,
      onSelect,
      onRemove,
      onClear,
      disableContainment,
    } = this.props;

    const { inputValue } = this.state;

    const renderChildrenWithFormState = ({
      onBlur,
      onFocus,
      onMouseEnter,
      onMouseLeave,
      calculateDropdownDimensions,
      inputRef,
      inputContainerRef,
      focused,
      hovered,
      dropdownMaxHeight,
      dropdownWidth,
    }) => {
      const renderChildrenWithSelection = ({
        getInputProps,
        getMenuProps,
        getRootProps,
        removeItem,
        handleSelection,
        isOpen,
        getItemProps,
        highlightedIndex,
        removeAll,
        openMenu,
        closeMenu,
      }) => {
        const handleFocusWrapper = evt => {
          onFocus(evt);
          calculateDropdownDimensions();
          openMenu();
        };

        const hasSelection = selectedItems.length > 0;
        const hasManySelected = selectedItems.length > 1;

        const selection =
          isFunction(renderSelection) &&
          renderSelection({
            removeItem,
          });

        const clearAllButton = isFunction(onClear) && hasManySelected && (
          <IconButton
            size={height - 4}
            icon={CloseIcon}
            title="Clear All"
            onClick={removeAll}
          />
        );

        const placeholder = !hasSelection ? hintText : '';

        const handleKeyDown = event => {
          const shouldRemoveLastChipWithBackspace =
            event.key === 'Backspace' &&
            event.target.value === '' &&
            selectedItems.length > 0;
          if (shouldRemoveLastChipWithBackspace) {
            removeItem(selectedItems[selectedItems.length - 1]);
          }

          if (event.key === 'Enter') {
            const value = event.target.value;
            const canCreate =
              value !== '' && highlightedIndex === null && isFunction(onCreate);
            if (!canCreate) return;

            const newItem = {
              id: value,
              value,
            };
            handleSelection(newItem.id, event);
            this.clearInput();
            const hasBeenCreated = Boolean(
              selectedItems.find(id => id === value),
            );
            if (!hasBeenCreated) {
              onCreate(newItem);
            }
          }
        };

        const inputProps = getInputProps({
          innerRef: inputRef,
          onKeyDown: handleKeyDown,
          onFocus: handleFocusWrapper,
          onBlur: onBlur,
        });

        const menuContents =
          isOpen &&
          isFunction(renderOptions) &&
          renderOptions({
            getItemProps,
            selectedItems,
          });

        const menuProps = getMenuProps({}, { suppressRefError: true });

        const menu = (
          <div
            role={menuProps.role}
            aria-labelledby={menuProps['aria-labelledby']}
          >
            {menuContents}
          </div>
        );

        const input = (
          <InputFieldContainer
            innerRef={inputContainerRef}
            height={height}
            fullWidth={fullWidth}
            stretch={stretch}
            dirty={dirty}
            disabled={disabled}
            error={error}
            success={success}
            inlineEdit={inlineEdit}
            focused={focused}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <SpacedGroup xs={2} center stretch>
              {selection}
              <InputField
                {...inputProps}
                height={height}
                value={inputValue}
                placeholder={placeholder}
                dirty={dirty}
                disabled={disabled}
                fullWidth={fullWidth}
                stretch={stretch}
                tabIndex={tabIndex}
              />
            </SpacedGroup>
            <InputStateIcon
              inlineEdit={inlineEdit}
              disabled={disabled}
              success={success}
              loading={loading}
              error={error}
              hovered={hovered}
            />
            {clearAllButton}
            <Arrow
              disabled={disabled}
              open={isOpen}
              height={height}
              onClick={isOpen ? closeMenu : () => inputRef.current.focus()}
            />
          </InputFieldContainer>
        );

        const dropdownHeight = Boolean(menuContents)
          ? this.props.dropdownHeight || dropdownMaxHeight
          : 0;

        const width = this.props.dropdownWidth || dropdownWidth;

        return (
          <ComboBox
            {...getRootProps({ refKey: 'innerRef' })}
            data-test={dataTest}
            fullWidth={fullWidth}
            stretch={stretch}
          >
            <Menu
              placement="bottom-start"
              open={isOpen}
              anchor={input}
              width={width}
              height={dropdownHeight}
              disableContainment={disableContainment}
            >
              {menu}
            </Menu>
          </ComboBox>
        );
      };

      return (
        <MultiDownshift
          {...this.props}
          onSelect={onSelect}
          onRemove={onRemove}
          onCreate={onCreate}
          onInputValueChange={this.handleInputValueChange}
          clearInput={this.clearInput}
          focus={() => inputRef.current.focus()}
        >
          {renderChildrenWithSelection}
        </MultiDownshift>
      );
    };

    return (
      <StyleProvider>
        <WithFormFieldState
          inlineEdit={this.props.inlineEdit}
          focused={this.props.focused}
          hovered={this.props.hovered}
          dropdownMaxHeight={this.props.dropdownMaxHeight}
          dropdownWidth={this.dropdownWidth}
          onFocus={this.props.onFocus}
          onBlur={this.props.onBlur}
        >
          {renderChildrenWithFormState}
        </WithFormFieldState>
      </StyleProvider>
    );
  }
}

MultiSelect.propTypes = {
  /**
   * Array of item ids.
   */
  selectedItems: PropTypes.array,
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

export default MultiSelect;
