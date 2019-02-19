import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { noop, isFunction } from 'underscore';
import { Manager, Reference, Popper } from 'react-popper';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';
import { Paper } from '../Paper';
import { ScrollableContainer } from '../ScrollableContainer';
import { Scrim } from '../Scrim';
import { PortalContainer } from '../PortalContainer';
import * as placements from './placements';

const PositionedMenu = createComponent(
  ({ style }) => ({
    ...style,
  }),
  'div',
  ['data-placement', 'data-test', 'data-component'],
);
const AdjustmentForFocusDisplay = createComponent(
  () => ({
    ...styleUtils.margin(1),
  }),
  'div',
);

const MenuChildren = ({
  dataTest,
  placement,
  modifiers,
  width,
  height,
  disableContainment,
  open,
  children,
  onKeyDown,
}) => {
  const renderChildren = innerBind => {
    if (!open) return null;

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

  return (
    <PortalContainer mounted={open}>
      <Popper placement={placement} positionFixed modifiers={modifiers}>
        {({ ref, style }) => {
          const container = (
            <ScrollableContainer width={width} height={height}>
              {children}
            </ScrollableContainer>
          );

          const positionedMenu = disableContainment ? (
            container
          ) : (
            <Paper>{container}</Paper>
          );

          return (
            <PositionedMenu
              innerRef={ref}
              style={style}
              data-component="Popover"
              data-placement={placement}
              data-test={dataTest}
            >
              {positionedMenu}
            </PositionedMenu>
          );
        }}
      </Popper>
    </PortalContainer>
  );
};

class Popover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.close = this.close.bind(this);
  }

  handleKeyDown(event) {
    const isEscape = event.which === 27;
    isEscape && this.props && this.props.open && this.close(event);
  }

  close(event) {
    isFunction(this.pop) && this.pop();
    event.stopPropagation();
    isFunction(this.props.onClickOutside) && this.props.onClickOutside(event);
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

    const renderMenu =(
        <Fragment>
          <Reference>
            {({ ref }) => (
              <div ref={ref}>
                {anchor}
              </div>
            )}
          </Reference>
          {!disableScrim && (
            <Scrim open={open} disableVisibility onClick={this.close} />
          )}
          <MenuChildren
            open={open}
            disableContainment={disableContainment}
            height={height}
            width={width}
            placement={placement}
            modifiers={modifiers}
            onKeyDown={this.handleKeyDown}
            dataTest={dataTest}
          >
            {children}
          </MenuChildren>
        </Fragment>
      );

    const renderWithPop = (
      <Manager>
        {renderMenu}
      </Manager>
    );

    return (
      <StyleProvider>
       <Fragment>
          {renderWithPop}
        </Fragment>
      </StyleProvider>
    );
  }
}

Popover.propTypes = {
  /**
   * The element interacted with to open the menu
   */
  anchor: PropTypes.node.isRequired,
  /**
   * Orientation of the menu relative to the anchor
   */
  placement: PropTypes.oneOf(Object.values(placements)),
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

Popover.defaultProps = {
  placement: 'bottom',
  open: false,
  disableContainment: false,
  width: '200px',
  height: '300px',
  onClickOutside: noop,
  disableScrim: false,
  modifiers: {},
};

export { Popover };
