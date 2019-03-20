import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import { groupBy } from 'lodash';
import Navigation from '../Navigation';

const MainNavigation = ({ navigationOrder }) => (
  <StaticQuery
    query={mainNavigation}
    render={data => {
      const { edges: pages } = data.allMdx;
      const menuMap = groupBy(pages, ({ node: page }) => page.frontmatter.menu);
      const orderedNavItems = navigationOrder.concat(
        Object.keys(menuMap)
          .filter(
            menuName =>
              !navigationOrder.find(navItem => navItem.name === menuName),
          )
          .sort((a, b) => {
            if (a > b) return 1;
            if (a < b) return -1;
            return 0;
          })
          .map(menuName => ({ name: menuName, pages: [] })),
      );
      const hydratedOrderedNavItems = orderedNavItems.map(navItem => ({
        ...navItem,
        pages: menuMap[navItem.name]
          .sort(({ node: a }, { node: b }) => {
            const pageAIsTracked = navItem.pages.includes(a.frontmatter.name);
            const pageBIsTracked = navItem.pages.includes(b.frontmatter.name);
            if (pageAIsTracked && pageBIsTracked) {
              if (
                navItem.pages.indexOf(a.frontmatter.name) <
                navItem.pages.indexOf(b.frontmatter.name)
              ) {
                return -1;
              }
              return 1;
            }
            if (pageAIsTracked) return -1;
            if (pageBIsTracked) return 1;
            if (a.frontmatter.name > b.frontmatter.name) return 1;
            if (a.frontmatter.name < b.frontmatter.name) return -1;
            return 0;
          })
          .map(({ node }) => node),
      }));
      return <Navigation items={hydratedOrderedNavItems} />;
    }}
  />
);

MainNavigation.defaultProps = {
  navigationOrder: [],
};

export default MainNavigation;

export const mainNavigation = graphql`
  query DefaultMainNavigation {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            name
            menu
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
