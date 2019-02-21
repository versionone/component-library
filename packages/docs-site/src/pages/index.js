import React from 'react';
import { Link, graphql } from 'gatsby';
import SiteLayout from '../components/containers/SiteLayout';

const DocsIndex = ({ data }) => {
  const { edges: posts } = data.allMdx;

  return (
    <SiteLayout>
      <ul>
        {posts
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
          .map(({ node: post }) => (
            <li key={post.id}>
              <Link to={post.fields.slug}>
                <h2>{post.frontmatter.name}</h2>
              </Link>
              <p>{post.excerpt}</p>
            </li>
          ))}
      </ul>
    </SiteLayout>
  );
};

export default DocsIndex;
export const pageQuery = graphql`
  query blogIndex {
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
