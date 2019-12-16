import React from 'react';
import PropTypes from 'prop-types';
import { isFunction } from 'underscore';
import { CloseIcon } from '@versionone/icons';
import { Arrow } from '../Arrow';
import { InputFieldContainer, InputStateIcon, InputField } from '../FormUtils';
import { SpacedGroup } from '../SpacedGroup';
import { ComboBox } from '../ComboBox';
import { IconButton } from '../Button';
import { Menu } from '../Menu';

export const renderField = props => {
  const {
    'data-test': dataTest,
    inlineEdit,
    fullWidth,
    stretch,
    error,
    loading,
    dirty,
    success,
    hovered,
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

    dropdownMaxHeight,
    dropdownWidth,
    onFocus,
    calculateDropdownDimensions,
    focused,
    onMouseEnter,
    onMouseLeave,
    inputContainerRef,
    inputRef,

    getInputProps,
    getMenuProps,
    getRootProps,
    removeItem,
    handleSelection,
    isOpen,
    getItemProps,
    highlightedIndex,
    openMenu,
    closeMenu,
    inputValue,

    getItems,
  } = props;

  console.log('render field', selectedItems, inputValue, isOpen);

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
      selectedItems,
      removeItem,
    });

  const clearAllButton = isFunction(onClear) && hasManySelected && (
    <IconButton
      size={height - 4}
      icon={CloseIcon}
      title="Clear All"
      onClick={onClear}
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

    if (
      (event.key === 'ArrowDown' || event.key === 'ArrowUp') &&
      event.altKey
    ) {
      closeMenu();
      return;
    }

    if (event.key === 'ArrowDown' && !isOpen) {
      openMenu();
    }

    if (event.key === 'Enter') {
      const { value } = event.target;
      const canCreate =
        value !== '' && highlightedIndex === null && isFunction(onCreate);
      if (!canCreate) return;

      const newItem = {
        value,
        label: value,
      };
      handleSelection(newItem.value, event);
      const existed = Boolean(selectedItems.find(id => id === value));
      if (!existed) {
        onCreate(newItem);
      }
    }
  };

  const inputProps = getInputProps({
    innerRef: inputRef,
    onKeyDown: handleKeyDown,
    onFocus: handleFocusWrapper,
    value: inputValue,
  });

  const menuContents =
    isOpen &&
    isFunction(renderOptions) &&
    renderOptions({
      getItemProps,
      items: getItems(inputValue),
    });
  const menuProps = getMenuProps({}, { suppressRefError: true });

  const menu = (
    <div role={menuProps.role} aria-labelledby={menuProps['aria-labelledby']}>
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
      hovered={hovered}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <SpacedGroup xs={2} center stretch>
        {selection}
        <InputField
          {...inputProps}
          height={height}
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

  const finalDropdownHeight = menuContents
    ? dropdownHeight || dropdownMaxHeight
    : 0;

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
        width={dropdownWidth}
        height={finalDropdownHeight}
        disableContainment={disableContainment}
      >
        {menu}
      </Menu>
    </ComboBox>
  );
};

const ItemValuePropType = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
]);

const ItemPropType = PropTypes.shape({
  label: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

renderField.propTypes = {
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
  /**
   * returns the items filtered by the `filter` prop with a [ItemPropType] interface
   */
  getItems: PropTypes.func,
  /**
   * Funciton fired when option is selected.
   */
  handleSelection: PropTypes.func,
  /**
   * Set of items that can be selected
   */
  items: PropTypes.arrayOf(ItemPropType),
  /**
   * Set of ids of currently selected items
   */
  selectedItems: PropTypes.arrayOf(ItemValuePropType),
  /**
   * Function called that creates a new item when seleting an value that is not yet an option.
   */
  onCreate: PropTypes.func,
  /**
   * Clear the set of selected items
   */
  onClear: PropTypes.func,
  /**
   * Remove a specific item from the selected items
   */
  removeItem: PropTypes.func,
  /**
   * Render prop for rendering the options
   */
  renderOptions: PropTypes.func.isRequired,
  /**
   * Render prop for rendering the selected items
   */
  renderSelection: PropTypes.func,
  /**
   * If true don't wrap the menu in Paper
   */
  disableContainment: PropTypes.bool,
  /**
       * Filter predicate to apply when input changes occur
       * inputValue => item =>
       item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
     */
  filter: PropTypes.func,
  /**********************
      WithFormState Props
      **********************/

  focused: PropTypes.bool,
  /**
   * Indicates the control is hovered.
   */
  hovered: PropTypes.bool,
  /**
   * focus event handler.
   */
  onFocus: PropTypes.func,
  /**
   * blur event handler.
   */
  onBlur: PropTypes.func,
  /**
   * mouse enter event handler.
   */
  onMouseEnter: PropTypes.func,
  /**
   * mouse leave event handler.
   */
  onMouseLeave: PropTypes.func,
  /**
   * returns the calculated dropdown dimensions as a best fit.
   */
  calculateDropdownDimensions: PropTypes.func,
  /**
   * Ref of the input
   */
  inputRef: PropTypes.string,
  /**
   * Ref of the TextField
   */
  inputContainerRef: PropTypes.string,
  /**
   * Max height of the dropdown's height
   */
  dropdownMaxHeight: PropTypes.number,
  /**
   * dropdown's width
   */
  dropdownWidth: PropTypes.number,

  /**********************
      Downshift Props
      **********************/

  /**
   *  returns the props you should apply to any menu item elements you render.
   */
  getItemProps: PropTypes.func,
  /**
   *  returns the props you should apply to any input elements you render.
   */
  getInputProps: PropTypes.func,
  /**
   *  returns the props you should apply to any root elements you render.
   */
  getRootProps: PropTypes.func,
  /**
   * returns the props you should apply to the menu
   */
  getMenuProps: PropTypes.func,
  /**
   * If true the options are visible
   */
  isOpen: PropTypes.bool,
  /**
   * current text contained in the rendered input element
   */
  inputValue: PropTypes.string,
  /**
   * index of the highlighted option in the list
   */
  highlightedIndex: PropTypes.number,
  /**
   * Function that opens the menu
   */
  openMenu: PropTypes.func,
  /**
   * Function that closes the menu
   */
  closeMenu: PropTypes.func,

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
  defaultValue: PropTypes.string,
  /**
   * Indicates field is disabled from user input; no events will fire.
   */
  disabled: PropTypes.bool,
  /**
   * Indicates the page focus is on this control.
   */
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
};

renderField.defaultProps = {
  inputValue: '',
};
