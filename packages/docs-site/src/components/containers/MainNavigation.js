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

      const navItems = Object.entries(navMap).map(([menuCategory, items]) => [
        menuCategory,
        items.sort((a, b) => {
          if (a.frontmatter.name > b.frontmatter.name) return 1;
          if (a.frontmatter.name < b.frontmatter.name) return -1;
          return 0;
        }),
      ]);
      console.log(navItems);
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
