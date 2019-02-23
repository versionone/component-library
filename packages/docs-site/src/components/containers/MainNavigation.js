import { graphql, StaticQuery } from 'gatsby';
import React from 'react';
import Navigation from '../Navigation';

const MainNavigation = () => (
  <StaticQuery
    query={mainNavigation}
    render={data => {
      const { edges: pages } = data.allMdx;
      const navMap = pages.reduce((acc, { node: page }) => {
        if (!acc[page.frontmatter.menu]) {
          acc[page.frontmatter.menu] = [];
        }
        acc[page.frontmatter.menu].push(page);
        return acc;
      }, {});
      const navItems = Object.entries(navMap);
      return <Navigation items={navItems} />;
    }}
  />
);

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
