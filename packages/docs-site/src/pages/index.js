import React from 'react';
import { Link, graphql } from 'gatsby';
import SiteLayout from '../components/containers/SiteLayout';

const DocsIndex = ({ data }) => {
  const { edges: pages } = data.allMdx;

  return (
    <SiteLayout>
      <ul>
        {pages
          .sort(
            (
              {
                node: {
                  frontmatter: { name: a },
                },
              },
              {
                node: {
                  frontmatter: { name: b },
                },
              },
            ) => {
              if (a < b) return -1;
              if (a > b) return 1;
              return 0;
            },
          )
          .map(({ node: page }) => (
            <li key={page.id}>
              <Link to={page.fields.slug}>
                <h2>{page.frontmatter.name}</h2>
              </Link>
              <p>{page.excerpt}</p>
            </li>
          ))}
      </ul>
    </SiteLayout>
  );
};

export default DocsIndex;
export const pageQuery = graphql`
  query DocsIndex {
    allMdx {
      edges {
        node {
          id
          excerpt
          frontmatter {
            name
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
