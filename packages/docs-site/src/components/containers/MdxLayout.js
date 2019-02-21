import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import Seo from './Seo';
import SiteLayout from './SiteLayout';

function PageTemplate({ data: { mdx } }) {
  return (
    <SiteLayout>
      <Seo title={mdx.frontmatter.name} />
      <h1>{mdx.frontmatter.name}</h1>
      <MDXRenderer>{mdx.code.body}</MDXRenderer>
    </SiteLayout>
  );
}

export const pageQuery = graphql`
  query MdxPagesQuery($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        name
      }
      code {
        body
      }
    }
  }
`;

export default PageTemplate;
