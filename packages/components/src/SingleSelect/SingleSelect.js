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
} from "../FormUtils";
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

export class SingleSelect extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      height: '100px',
    };
    this.handleSelection = this.handleSelection.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.addItem = this.addItem.bind(this);
    this.stateReducer = this.stateReducer.bind(this);
  }

  handleSelection(selectedItem) {
    const alreadySelected =
      this.props.selectedItem !== null &&
      this.props.selectedItem.id === selectedItem.id;
    const action = alreadySelected ? this.removeItem : this.addItem;

    action(selectedItem);
  }

  removeItem(item) {
    const onRemove = this.props.onRemove;
    isFunction(onRemove) && onRemove(item.id);
  }

  addItem(item) {
    const onSelect = this.props.onSelect;
    isFunction(onSelect) && onSelect(item.id);
  }

  stateReducer(state, changes) {
    switch (changes.type) {
      case Downshift.stateChangeTypes.keyDownEnter:
        this.handleSelection(changes.selectedItem);
        return {
          isOpen: false,
        };
      default:
        return changes;
    }
  }

  render() {
    const {
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
        highlightedIndex,
        openMenu,
        closeMenu,
      }) => {
        const handleFocusWrapper = evt => {
          onFocus(evt);
          calculateDropdownDimensions();
          openMenu();
        };

        const handleBlurWrapper = evt => {
          onBlur(evt);
          closeMenu();
        };

        const overrideGetItemProps = args => {
          const { item, index } = args;
          const origialItemProps = getItemProps(args);
          return {
            ...origialItemProps,
            onClick: () => {
              this.handleSelection(item);
              closeMenu();
            },
            isActive: highlightedIndex === index,
            isSelected: selectedItem && selectedItem.id === item.id,
          };
        };

        const menuContents =
          isOpen &&
          isFunction(renderOptions) &&
          renderOptions({
            getItemProps: overrideGetItemProps,
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
          if (event.key === 'Enter') {
            const value = event.target.value;

            const canCreate =
              value !== '' && highlightedIndex === null && isFunction(onCreate);
            if (canCreate) {
              const newItem = {
                id: value,
                value,
              };
              this.handleSelection(newItem);
              onCreate(newItem);
              closeMenu();
            }
          }
        };

        const extensions = isFunction(onCreate)
          ? {
              innerRef: inputRef,
              onKeyDown: handleKeyDown,
            }
          : {
              innerRef: inputRef,
            };

        const inputProps = getInputProps(extensions);
        if (selectedItem) {
          inputProps.value = selectedItem.value;
        }

        const shouldRenderSelection =
          selectedItem && isFunction(renderSelection);

        const selection =
          shouldRenderSelection &&
          renderSelection({ removeItem: this.removeItem });

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
                onBlur={handleBlurWrapper}
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
          ? this.props.dropdownHeight || dropdownMaxHeight
          : 0;
        const width = this.props.dropdownWidth || dropdownWidth;

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
        >
          {renderWithSelection}
        </Downshift>
      );
    };

    return (
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
    );
  }
}

SingleSelect.propTypes = {
  /**
   * Currently selected item
   */
  selectedItem: PropTypes.any,
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

SingleSelect.defaultProps = {
  selectedItem: null,
  onRemove: noop,
  onSelect: noop,
  onCreate: null,
  renderOptions: noop,
  renderSelection: null,
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

export default SingleSelect;
