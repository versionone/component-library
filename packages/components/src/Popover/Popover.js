import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { Manager, Reference, Popper } from 'react-popper';
import { noop } from 'underscore';
import { DetectExternalEvents } from '../DetectExternalEvents';
import { PortalContainer } from '../PortalContainer';
import { StyleProvider, createComponent } from '../StyleProvider';
import * as placements from './placements';

const PositionedMenu = createComponent(
  ({ style }) => ({
    ...style,
  }),
  'div',
  ['data-placement', 'data-test', 'data-component'],
);

class Popover extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  handleClickOutside(event) {
    const { onClickOutside } = this.props;

    event.stopPropagation();
    onClickOutside(event);
  }

  render() {
    const {
      anchor,
      children,
      fixed,
      open,
      placement,
      modifiers,
      'data-test': dataTest,
    } = this.props;

    return (
      <StyleProvider>
        <DetectExternalEvents
          domEvents={['click']}
          reactEvents={['onClick']}
          onExternalEvent={this.handleClickOutside}
        >
          <Manager>
            <Fragment>
              <Reference>
                {({ ref }) => <div ref={ref}>{anchor}</div>}
              </Reference>
              <PortalContainer mounted={open}>
                <Popper
                  modifiers={modifiers}
                  placement={placement}
                  positionFixed={fixed}
                >
                  {({ ref, style }) => (
                    <PositionedMenu
                      data-component="Popover"
                      data-placement={placement}
                      data-test={dataTest}
                      innerRef={ref}
                      style={style}
                    >
                      {children}
                    </PositionedMenu>
                  )}
                </Popper>
              </PortalContainer>
            </Fragment>
          </Manager>
        </DetectExternalEvents>
      </StyleProvider>
    );
  }
}

Popover.propTypes = {
  /** The element interacted with to open the men. */
  anchor: PropTypes.node.isRequired,
  /** Contents of the popped over panel */
  children: PropTypes.node.isRequired,
  /** Data test attribute  */
  'data-test': PropTypes.string,
  /** When true, uses fixed position strategy of react-popper */
  fixed: PropTypes.bool,
  /** Popper.js modifiers */
  modifiers: PropTypes.object /* eslint-disable-line react/forbid-prop-types */,
  /** Function called when the user clicks outside the menu */
  onClickOutside: PropTypes.func,
  /** If true then the menu is visible */
  open: PropTypes.bool,
  /** Orientation of the menu relative to the anchor */
  placement: PropTypes.oneOf(Object.values(placements)),
};

Popover.defaultProps = {
  fixed: false,
  modifiers: {},
  onClickOutside: noop,
  open: false,
  placement: 'bottom',
};

export { Popover };
