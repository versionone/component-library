import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { noop, isFunction } from 'underscore';
import { FocusManager } from '../FocusManager';
import { Paper } from '../Paper';
import { Popover } from '../Popover';
import { Scrim } from '../Scrim';
import { ScrollableContainer } from '../ScrollableContainer';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';

const AdjustmentForFocusDisplay = createComponent(
  () => ({
    ...styleUtils.margin(1),
  }),
  'div',
);

const MenuChildren = ({
  width,
  height,
  disableContainment,
  children,
  onKeyDown,
}) => {
  const renderChildren = innerBind => {
    const list = React.Children.toArray(children)[0];
    const listItems = React.Children.map(list.props.children, (child, i) => {
      const childProps = {
        key: i,
        ...innerBind,
        onKeyDown: evt => {
          onKeyDown(evt);
          child.props.onKeyDown(evt);
        },
      };
      return React.cloneElement(child, childProps);
    });

    const focusableList = React.cloneElement(list, {
      children: listItems,
    });

    return (
      <AdjustmentForFocusDisplay>{focusableList}</AdjustmentForFocusDisplay>
    );
  };

  const container = (
    <ScrollableContainer width={width} height={height}>
      <FocusManager.Group>{renderChildren}</FocusManager.Group>
    </ScrollableContainer>
  );
  const positionedMenu = disableContainment ? (
    container
  ) : (
    <Paper>{container}</Paper>
  );
  return positionedMenu;
};

class Menu extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.close = this.close.bind(this);
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { open } = this.props;
    const willOpen = !prevProps.open && open;
    if (willOpen) {
      return {
        scrollY: window.scrollY,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { open } = this.props;
    const willOpen = !prevProps.open && open;
    if (willOpen && snapshot && snapshot.scrollY) {
      window.scrollTo(0, snapshot.scrollY);
    }
  }

  handleKeyDown(event) {
    const isEscape = event.which === 27;
    isEscape && this.props && this.props.open && this.close(event);
  }

  close(event) {
    const { onClickOutside } = this.props;
    if (isFunction(this.pop)) {
      this.pop();
    }
    event.stopPropagation();
    onClickOutside(event);
  }

  render() {
    const {
      anchor,
      children,
      disableScrim,
      disableContainment,
      height,
      open,
      placement,
      modifiers,
      width,
      'data-test': dataTest,
    } = this.props;

    const renderMenu = bind => {
      return (
        <Fragment>
          {!disableScrim && (
            <Scrim open={open} disableVisibility onClick={this.close} />
          )}
          <Popover
            anchor={React.cloneElement(anchor, bind)}
            modifiers={modifiers}
            onClickOutside={this.close}
            open={open}
            placement={placement}
          >
            <div data-test={dataTest} data-component="Menu">
              <MenuChildren
                disableContainment={disableContainment}
                height={height}
                width={width}
                onKeyDown={this.handleKeyDown}
              >
                {children}
              </MenuChildren>
            </div>
          </Popover>
        </Fragment>
      );
    };

    const renderWithPop = pop => {
      this.pop = pop;

      return <FocusManager.Group disableLock>{renderMenu}</FocusManager.Group>;
    };

    return (
      <StyleProvider>
        <FocusManager>{renderWithPop}</FocusManager>
      </StyleProvider>
    );
  }
}

Menu.propTypes = {
  /**
   * The element interacted with to open the menu
   */
  anchor: PropTypes.node.isRequired,
  /**
   * Orientation of the menu relative to the anchor
   */
  placement: PropTypes.oneOf([
    'bottom',
    'top',
    'right',
    'left',
    'auto',
    'bottom-start',
    'top-start',
    'right-start',
    'left-start',
    'auto-start',
    'bottom-end',
    'top-end',
    'right-end',
    'left-end',
    'auto-end',
  ]),
  /**
   * If true then the menu is visible
   */
  open: PropTypes.bool,
  /**
   * Width of the menu
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * Height of the menu
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * If true the menu will not be contained by Paper
   */
  disableContainment: PropTypes.bool,
  /**
   * Function called when the user clicks outside the menu
   */
  onClickOutside: PropTypes.func,
  /**
   * If true a Scrim will not render or catch "click outside"
   */
  disableScrim: PropTypes.bool,
  /**
   * Popper.js modifiers
   */
  modifiers: PropTypes.object,
  /**
   * Data test attribute
   */
  'data-test': PropTypes.string,
};

Menu.defaultProps = {
  placement: 'bottom',
  open: false,
  disableContainment: false,
  width: '200px',
  height: '300px',
  onClickOutside: noop,
  disableScrim: false,
  modifiers: {},
};

export { Menu };
