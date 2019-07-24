import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { noop, isFunction } from 'underscore';
import { Manager, Reference, Popper } from 'react-popper';
import { Paper } from '../Paper';
import { Scrim } from '../Scrim';
import { ScrollableContainer } from '../ScrollableContainer';
import { createComponent, styleUtils } from '../StyleProvider';
import { PortalContainer } from '../PortalContainer';
import { DetectExternalEvents } from '../DetectExternalEvents';

const PositionedMenu = createComponent(
  ({ style }) => ({
    ...style,
  }),
  'div',
  ['data-placement', 'data-component', 'data-test'],
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
  close,
}) => {
  const renderChildren = () => {
    if (!open) return null;
    return children;
  };

  return (
    <PortalContainer mounted={open}>
      <Popper placement={placement} positionFixed={true} modifiers={modifiers}>
        {({ ref, style, placement }) => {
          const container = (
            <ScrollableContainer width={width} height={height}>
              {renderChildren()}
            </ScrollableContainer>
          );

          const positionedMenu = disableContainment ? (
            container
          ) : (
            <Paper elevation>{container}</Paper>
          );

          return (
            <PositionedMenu
              innerRef={ref}
              style={style}
              data-placement={placement}
              data-component="Menu"
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

class Menu extends React.PureComponent {
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
        scrollY: window.pageYOffset,
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
    const { onClickOutside, open } = this.props;
    if (!open) return;
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

    return (
      <DetectExternalEvents
        domEvents={['click']}
        reactEvents={['onClick']}
        onExternalEvent={this.close}
      >
        <Manager>
          <Fragment>
            <Reference>{({ ref }) => <div ref={ref}>{anchor}</div>}</Reference>
            {!disableScrim && (
              <Scrim open={open} disableVisibility onClick={this.close} />
            )}
            <MenuChildren
              open={open}
              disableContainment={disableContainment}
              height={height}
              width={width}
              placement={placement}
              onKeyDown={this.handleKeyDown}
              modifiers={modifiers}
              dataTest={dataTest}
              close={this.close}
            >
              {children}
            </MenuChildren>
          </Fragment>
        </Manager>
      </DetectExternalEvents>
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
