import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';
import { PortalContainer } from '../PortalContainer';

const ScrimImpl = createComponent(
  ({ open, disableVisibility, theme }) => ({
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: disableVisibility ? palette.transparent : theme.Scrim.main,
    opacity: open ? 0.6 : 0,
    ...styleUtils.conditionalStyle(!open, 'pointer-events', 'none'),
  }),
  'div',
  ['onClick', 'data-component', 'data-test', 'data-open', 'data-scroll-lock'],
);

class Scrim extends React.Component {
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
    const { disableScrollLock, open } = this.props;
    if (prevProps.disableScrollLock || disableScrollLock) {
      return;
    }

    const isOnlyOpenScrim =
      document.querySelectorAll(
        '[data-component="Scrim"][data-open="true"][data-scroll-lock]',
      ).length <= 1;

    const willOpen = !prevProps.open && open;
    const willClose = prevProps.open && !open && isOnlyOpenScrim;

    if (willOpen) {
      const documentWidth = document.documentElement.clientWidth;
      const windowWidth = window.innerWidth;
      const scrollBarWidth = windowWidth - documentWidth;

      document.body.setAttribute(
        'style',
        `overflow: hidden; -webkit-overflow-scrolling: touch; padding-right: ${scrollBarWidth}px;`,
      );
      if (snapshot && snapshot.scrollY) {
        window.scrollTo(0, snapshot.scrollY);
      }
    } else if (willClose) {
      document.body.removeAttribute('style');
    }
  }

  render() {
    const {
      open,
      disableVisibility,
      disableScrollLock,
      onClick,
      'data-test': dataTest,
      children,
    } = this.props;

    return (
      <PortalContainer mounted={open}>
        <ScrimImpl
          onClick={onClick}
          disableVisibility={disableVisibility}
          open={open}
          data-component="Scrim"
          data-test={dataTest}
          data-open={`${open}`}
          data-scroll-lock={`${!disableScrollLock}`}
        >
          {children}
        </ScrimImpl>
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
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Content above scrim
   */
  children: PropTypes.node,
};

Scrim.defaultProps = {
  open: false,
  onClick: noop,
  disableVisibility: false,
  disableScrollLock: false,
};

export { Scrim };
