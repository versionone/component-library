import EventListener from 'react-event-listener';
import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  createComponent,
  PortalContainer,
  ScrollableContainer,
  StyleProvider,
} from '@versionone/components';

import Header from '../header';
import MainNavigation from './MainNavigation';
import '../layout.css';

const FlexContainer = createComponent(() => ({ display: 'flex' }), 'div');
const FixedContainer = createComponent(
  props => ({ position: 'fixed', ...props }),
  'div',
);
const Fixed = props => (
  <PortalContainer mounted>
    <FixedContainer {...props} />
  </PortalContainer>
);
const Aside = createComponent(
  ({ height, width }) => ({
    height,
    width,
  }),
  'aside',
);
const Main = createComponent(
  ({ fromTop, margin, maxWidth }) => ({
    margin,
    marginTop: fromTop,
    maxWidth,
    padding: '0px 1.0875rem 1.45rem',
    paddingTop: 0,
  }),
  'main',
);

class SiteLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      width: window ? window.innerWidth : 0,
    };
  }

  handleResize = evt => {
    this.setState({ width: evt.target.innerWidth });
  };

  render() {
    const { children } = this.props;
    const { width } = this.state;

    const headerHeight = 100;
    const mainWidth = 960;
    const asideWidth = 320;
    const isCentered = width > mainWidth + asideWidth * 2;
    return (
      <StyleProvider>
        <EventListener onResize={this.handleResize} target={window || 'window'}>
          <StaticQuery
            query={graphql`
              query SiteTitleQuery {
                site {
                  siteMetadata {
                    title
                  }
                }
              }
            `}
            render={data => (
              <Fragment>
                <Fixed left={0} right={0} top={0} height={headerHeight}>
                  <Header siteTitle={data.site.siteMetadata.title} />
                </Fixed>
                <FlexContainer>
                  <Fixed left={0} top={headerHeight}>
                    <Aside
                      height={`calc(100vh - ${headerHeight + 20}px)`}
                      width={asideWidth}
                    >
                      <ScrollableContainer>
                        <MainNavigation />
                      </ScrollableContainer>
                    </Aside>
                  </Fixed>
                  <Main
                    margin={isCentered ? `0 auto` : `0 0 0 ${asideWidth}px`}
                    fromTop={headerHeight + 20}
                    maxWidth={mainWidth}
                  >
                    {children}
                  </Main>
                </FlexContainer>
              </Fragment>
            )}
          />
        </EventListener>
      </StyleProvider>
    );
  }
}

export default SiteLayout;
