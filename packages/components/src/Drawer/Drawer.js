import { noop, isFunction } from 'underscore';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { palette } from '../palette';
import { Scrim } from '../Scrim';
import { PortalContainer } from '../PortalContainer';

const TOP = 'top';
const LEFT = 'left';
const BOTTOM = 'bottom';
const RIGHT = 'right';

const Impl = createComponent(
  ({ open, position, placement, size, shadow, backgroundColor, theme }) => {
    const offset = size + (shadow ? 30 : 0);
    const layout = (() => {
      if (placement === TOP) {
        return {
          top: 0,
          left: 0,
          right: 0,
          height: size,
          ...styleUtils.conditionalStyle(
            open,
            'transform',
            'translate(0px, 0px)',
            `translate(0px, -${offset}px)`,
          ),
        };
      }

      if (placement === BOTTOM) {
        return {
          bottom: 0,
          left: 0,
          right: 0,
          height: size,
          ...styleUtils.conditionalStyle(
            open,
            'transform',
            'translate(0px, 0px)',
            `translate(0px, ${offset}px)`,
          ),
        };
      }

      if (placement === LEFT) {
        return {
          left: 0,
          top: 0,
          bottom: 0,
          width: size,
          ...styleUtils.conditionalStyle(
            open,
            'transform',
            'translate(0px, 0px)',
            `translate(-${offset}px, 0px)`,
          ),
        };
      }

      if (placement === RIGHT) {
        return {
          right: 0,
          top: 0,
          bottom: 0,
          width: open ? size : 0,
          ...styleUtils.conditionalStyle(
            open,
            'transform',
            'translate(0px, 0px)',
            `translate(${offset}px, 0px)`,
          ),
        };
      }

      return {};
    })();

    return {
      ...layout,
      position,
      background: backgroundColor,
      transition: 'transform 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
      ...styleUtils.conditionalStyle(
        shadow,
        'box-shadow',
        '0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)',
      ),
    };
  },
  'div',
  ['aria-hidden', 'data-component', 'data-test'],
);

class Drawer extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown(event) {
    const { handleClickOutside } = this.props;
    const isEscape = event.which === 27;
    if (isEscape && isFunction(handleClickOutside)) handleClickOutside();
  }

  render() {
    const props = {
      ...this.props,
    };

    if (!props.open) {
      props['aria-hidden'] = true;
    }

    const scrim = (
      <Scrim open={props.open} onClick={props.handleClickOutside} />
    );

    const drawer = (
      <StyleProvider>
        <PortalContainer mounted={props.open}>
          <Impl {...props} data-component="Drawer" />
        </PortalContainer>
      </StyleProvider>
    );

    return (
      <Fragment>
        {scrim}
        {drawer}
      </Fragment>
    );
  }
}

Drawer.propTypes = {
  /**
   * Contents of the drawer
   */
  children: PropTypes.node,
  /**
   * Determines the drawers placement
   */
  placement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),
  /**
   * How tall or wide the drawer is
   */
  size: PropTypes.number,
  /**
   * If true the drawer is visible
   */
  open: PropTypes.bool,
  /**
   * If true the drawer shows elevation with a shadow
   */
  shadow: PropTypes.bool,
  /**
   * Background color of the drawer
   */
  backgroundColor: PropTypes.string,
  /**
   * Position of the drawer. Fixed unless bounded by a DrawerBoundary
   */
  position: PropTypes.oneOf(['fixed', 'absolute']),
  /**
   * Function triggered when the user clicks outside the Menu's dropdown
   */
  handleClickOutside: PropTypes.func,
};

Drawer.defaultProps = {
  placement: LEFT,
  size: 500,
  open: false,
  shadow: true,
  backgroundColor: palette.paper,
  position: 'fixed',
  handleClickOutside: noop,
};

export { Drawer };
