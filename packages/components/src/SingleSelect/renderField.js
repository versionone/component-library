import React from 'react';
import PropTypes from 'prop-types';
import { noop, isFunction } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { Arrow } from '../Arrow';
import { InputFieldContainer, InputStateIcon, InputField } from '../FormUtils';
import { Menu } from '../Menu';
import { ComboBox } from '../ComboBox';

const HideOnSelection = createComponent(
  ({ shrink, height }) => ({
    height: height - 2,
    display: 'flex',
    alignItems: 'center',
    flex: 'auto',
    overflow: 'hidden',
    ...styleUtils.conditionalStyle(shrink, 'width', 0),
  }),
  'span',
);

export const renderField = props => {
  const {
    getInputProps,
    getItemProps,
    getRootProps,
    getMenuProps,
    isOpen,
    inputValue,
    highlightedIndex,
    openMenu,
    closeMenu,
    providedDropdownWidth,
    providedDropdownHeight,
    hintText,
    fullWidth,
    height,
    stretch,
    dirty,
    disabled,
    error,
    success,
    loading,
    inlineEdit,
    onCreate,
    renderOptions,
    renderSelection,
    selectedItem,
    disableContainment,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    calculateDropdownDimensions,
    inputRef,
    inputContainerRef,
    focused,
    hovered,
    dropdownMaxHeight,
    dropdownWidth,
    lastSelected,
    getItems,
    handleSelection,
  } = props;

  const handleFocusWrapper = evt => {
    onFocus(evt);
    calculateDropdownDimensions();
    openMenu();
  };

  const overrideGetItemProps = args => {
    const { item, index } = args;
    const origialItemProps = getItemProps(args);
    const zeroBasedIndex = index;
    return {
      ...origialItemProps,
      isActive: highlightedIndex === zeroBasedIndex,
      isSelected: selectedItem && selectedItem.value === item.value,
      isPreviousSelection: lastSelected && lastSelected.value === item.value,
    };
  };

  const menuContents =
    isOpen &&
    isFunction(renderOptions) &&
    renderOptions({
      getItemProps: overrideGetItemProps,
      items: getItems(inputValue),
    });

  const menuProps = getMenuProps({}, { suppressRefError: true });

  const menu = (
    <div role={menuProps.role} aria-labelledby={menuProps['aria-labelledby']}>
      {menuContents}
    </div>
  );

  const handleKeyDown = event => {
    const { value } = event.target;

    if (event.key === 'Escape') {
      // prevent `Escape` from closing a Drawer
      event.stopPropagation();
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

    const canCreate =
      event.key === 'Enter' &&
      value !== '' &&
      highlightedIndex === null &&
      isFunction(onCreate);

    if (canCreate) {
      const newItem = {
        label: value,
        value,
      };
      handleSelection(newItem);
      onCreate(newItem);
      closeMenu();
    }
  };

  const inputProps = getInputProps({
    onKeyDown: handleKeyDown,
    value: inputValue,
    innerRef: inputRef,
  });
  const shouldRenderSelection = selectedItem && isFunction(renderSelection);

  const selection = shouldRenderSelection && renderSelection();

  const input = (
    <InputFieldContainer
      innerRef={inputContainerRef}
      height={height}
      isHeightCapped
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
      {selection}
      <HideOnSelection shrink={shouldRenderSelection} height={height}>
        <InputField
          {...inputProps}
          height={height}
          dirty={dirty}
          disabled={disabled}
          placeholder={hintText}
          onFocus={handleFocusWrapper}
          onBlur={event => {
            inputProps.onBlur(event);
            closeMenu();
            onBlur(event);
          }}
          fullWidth={fullWidth}
          stretch={stretch}
        />
      </HideOnSelection>
      <InputStateIcon
        inlineEdit={inlineEdit}
        success={success}
        loading={loading}
        error={error}
        hovered={hovered}
      />
      <Arrow
        disabled={disabled}
        open={isOpen}
        height={height}
        onClick={isOpen ? closeMenu : () => inputRef.current.focus()}
      />
    </InputFieldContainer>
  );

  const dropdownHeight = menuContents
    ? providedDropdownHeight || dropdownMaxHeight
    : 0;
  const width = providedDropdownWidth || dropdownWidth;

  return (
    <ComboBox
      {...getRootProps({ refKey: 'innerRef' })}
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

const ItemPropType = PropTypes.shape({
  label: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
});

renderField.propTypes = {
  /**
   * The most recently selected item. Not always the currently selected item.
   */
  lastSelected: ItemPropType,
  /**
   * returns the items with a [ItemPropType] interface
   */
  getItems: PropTypes.func,
  /**
   * Funciton fired when option is selected.
   */
  handleSelection: PropTypes.func,

  /**********************
    Single Select Props
    **********************/

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
     * Filter predicate to apply when input changes occur
     * inputValue => item =>
     item.label.toLowerCase().startsWith(inputValue.toLowerCase()),
   */
  filter: PropTypes.func,
  /**
   * Width of the dropdown (includes units pxs, %, rems, etc) before calculation
   */
  providedDropdownWidth: PropTypes.string,
  /**
   * Explicit height of the dropdown before calculation
   */
  providedDropdownHeight: PropTypes.number,
  /**
   * maxium height of the dropdown before calculation
   */
  providedDropdownMaxHeight: PropTypes.number,

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
