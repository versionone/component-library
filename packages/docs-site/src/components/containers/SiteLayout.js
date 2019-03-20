import EventListener from 'react-event-listener';
import React, { Fragment } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import {
  createComponent,
  PortalContainer,
  ScrollableContainer,
  StyleProvider,
  styleUtils,
} from '@versionone/components';

import Header from '../header';
import MainNavigation from './MainNavigation';
import '../layout.css';

const FlexContainer = createComponent(() => ({ display: 'flex' }), 'div');
const FixedContainer = createComponent(
  props => ({ position: 'fixed', ...props }),
  'div',
);
const Fixed = ({ mounted, ...otherProps }) => (
  <PortalContainer mounted={mounted}>
    <FixedContainer {...otherProps} />
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
  ({ fromTop, isCentered, marginLeft, maxWidth }) => ({
    ...styleUtils.conditionalStyle(
      isCentered,
      'marginLeft',
      'auto',
      marginLeft,
    ),
    ...styleUtils.conditionalStyle(isCentered, 'marginRight', 'auto'),
    marginTop: fromTop,
    maxWidth,
    padding: '0px 1.0875rem 1.45rem',
    paddingTop: 0,
    width: maxWidth,
  }),
  'div',
);

class SiteLayout extends React.Component {
  constructor() {
    super();
    this.state = {
      mounted: false,
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
    };
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      width: typeof window !== 'undefined' ? window.innerWidth : 0,
    });
  }

  handleResize = evt => {
    this.setState({ width: evt.target.innerWidth });
  };

  render() {
    const { children } = this.props;
    const { mounted, width } = this.state;

    const headerHeight = 100;
    const mainWidth = 960;
    const asideWidth = 320;
    const isCentered = width > mainWidth + asideWidth * 2;

    return (
      <StyleProvider>
        <EventListener
          onResize={this.handleResize}
          target={typeof window !== 'undefined' ? window : 'window'}
        >
          <StaticQuery
            query={graphql`
              query SiteTitleQuery {
                site {
                  siteMetadata {
                    title
                    navigationOrder {
                      name
                      pages
                    }
                  }
                }
              }
            `}
            render={data => (
              <Fragment>
                <Fixed
                  left={0}
                  right={0}
                  top={0}
                  height={headerHeight}
                  mounted={mounted}
                  width="calc(100vw - 15px)"
                >
                  <Header siteTitle={data.site.siteMetadata.title} />
                </Fixed>
                <FlexContainer>
                  <Fixed left={0} top={headerHeight} mounted={mounted}>
                    <Aside
                      height={`calc(100vh - ${headerHeight + 20}px)`}
                      width={asideWidth}
                    >
                      <ScrollableContainer>
                        <MainNavigation
                          navigationOrder={
                            data.site.siteMetadata.navigationOrder
                          }
                        />
                      </ScrollableContainer>
                    </Aside>
                  </Fixed>
                  <Main
                    isCentered={isCentered}
                    marginLeft={asideWidth}
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
