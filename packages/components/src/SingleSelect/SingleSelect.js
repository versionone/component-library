import React from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { noop, isFunction } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { Arrow } from '../Arrow';
import {
  InputFieldContainer,
  InputStateIcon,
  InputField,
  WithFormFieldState,
} from '../FormUtils';
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

class SingleSelect extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lastSelected: null,
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
      dropdownWidth: providedDropdownWidth,
      dropdownHeight: providedDropdownHeight,
      dropdownMaxHeight: providedDropdownMaxHeight,
      hovered: providedHovered,
      focused: providedFocused,
      onFocus: providedOnFocus,
      onBlur: providedOnBlur,
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
    } = this.props;

    const renderChildrenWithFormState = ({
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
    }) => {
      const renderWithSelection = ({
        getInputProps,
        getItemProps,
        getRootProps,
        getMenuProps,
        isOpen,
        inputValue,
        highlightedIndex,
        openMenu,
        closeMenu,
      }) => {
        const handleFocusWrapper = evt => {
          onFocus(evt);
          calculateDropdownDimensions();
          openMenu();
        };

        const overrideGetItemProps = args => {
          const { item, index } = args;
          const { lastSelected } = this.state;
          const origialItemProps = getItemProps(args);
          const zeroBasedIndex = index;
          return {
            ...origialItemProps,
            isActive: highlightedIndex === zeroBasedIndex,
            isSelected: selectedItem && selectedItem.value === item.value,
            isPreviousSelection:
              lastSelected && lastSelected.value === item.value,
          };
        };

        const menuContents =
          isOpen &&
          isFunction(renderOptions) &&
          renderOptions({
            getItemProps: overrideGetItemProps,
            items: this.getItems(inputValue),
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

        const handleKeyDown = event => {
          const { value } = event.target;

          if (event.key === 'Escape') {
            // prevent `Escape` from closing a Drawer
            event.stopPropagation();
          }

          if (!event.key === 'Enter') return;

          const canCreate =
            value !== '' && highlightedIndex === null && isFunction(onCreate);

          if (canCreate) {
            const newItem = {
              label: value,
              value,
            };
            this.handleSelection(newItem);
            onCreate(newItem);
            closeMenu();
          }
        };

        const inputProps = getInputProps({
          onKeyDown: handleKeyDown,
          value: inputValue,
          innerRef: inputRef,
        });
        const shouldRenderSelection =
          selectedItem && isFunction(renderSelection);

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
                  if (isFunction(providedOnBlur)) {
                    providedOnBlur(event);
                  }
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

      return (
        <Downshift
          onChange={this.handleSelection}
          stateReducer={this.stateReducer}
          itemToString={noop}
          initialInputValue=""
        >
          {renderWithSelection}
        </Downshift>
      );
    };

    return (
      <WithFormFieldState
        inlineEdit={inlineEdit}
        focused={providedFocused}
        hovered={providedHovered}
        dropdownMaxHeight={providedDropdownMaxHeight}
        dropdownWidth={this.dropdownWidth}
        onFocus={providedOnFocus}
        onBlur={providedOnBlur}
      >
        {renderChildrenWithFormState}
      </WithFormFieldState>
    );
  }
}

const ItemPropType = PropTypes.shape({
  label: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
  value: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
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
  defaultValue: PropTypes.string,
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
  selectedItem: null,
  onRemove: noop,
  onSelect: noop,
  onCreate: null,
  renderSelection: null,
  disableContainment: false,
  dropdownWidth: null,
  dropdownMaxHeight: 600,
  filter: inputValue => item =>
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
