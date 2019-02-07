import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import palette from '../palette';
import { PortalContainer } from '../PortalContainer';

const ScrimImpl = createComponent(
  ({ open, disableVisibility, theme }) => ({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    'background-color': disableVisibility
      ? palette.transparent
      : theme.Scrim.main,
    opacity: open ? 0.6 : 0,
    ...styleUtils.conditionalStyle(!open, 'pointer-events', 'none'),
  }),
  'div',
  ['onClick', 'data-component', 'data-test', 'data-open', 'data-scroll-lock'],
);

class Scrim extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.disableScrollLock || nextProps.disableScrollLock) {
      return;
    }

    const isOnlyOpenScrim =
      document.querySelectorAll(
        '[data-component="Scrim"][data-open="true"][data-scroll-lock]',
      ).length <= 1;

    const willOpen = !this.props.open && nextProps.open;
    const willClose = this.props.open && !nextProps.open && isOnlyOpenScrim;

    if (willOpen) {
      const documentWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      const scrollBarWidth = windowWidth - documentWidth;

      document.body.setAttribute(
        'style',
        `overflow: hidden; -webkit-overflow-scrolling: touch; padding-right: ${scrollBarWidth}px;`,
      );
    } else if (willClose) {
      document.body.removeAttribute('style');
    }
  }

  render() {
    const props = this.props;

    return (
      <PortalContainer mounted={props.open}>
        <StyleProvider>
          <ScrimImpl
            {...props}
            open={props.open}
            data-component="Scrim"
            data-open={`${props.open}`}
            data-scroll-lock={`${!props.disableScrollLock}`}
          />
        </StyleProvider>
      </PortalContainer>
    );
  }
}

Scrim.propTypes = {
  /**
   * If true the scrim covers the screen
   */
  open: PropTypes.bool,
  /**
   * Click handler on the scrim
   */
  onClick: PropTypes.func,
  /**
   * If true the scrim covers the screen, but is not visible
   */
  disableVisibility: PropTypes.bool,
  /**
   * If true then the scrim does not lock the scroll
   */
  disableScrollLock: PropTypes.bool,
};

Scrim.defaultProps = {
  open: false,
  onClick: noop,
  disableVisibility: false,
  disableScrollLock: false,
};

export default Scrim;
