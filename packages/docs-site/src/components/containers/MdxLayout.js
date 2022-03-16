import React from 'react';
import { MDXProvider } from "@mdx-js/react";
import { Code } from '@versionone/components';
import Seo from './Seo';
import SiteLayout from './SiteLayout';

function PageTemplate({ children, pageContext }) {
  return (
    <MDXProvider
      components={{
        pre: ({ children }) => children,
        code: ({ children, className }) => {
          const language = className
            ? className.replace('language-', '')
            : null;
          return <Code language={language}>{children}</Code>;
        },
      }}
    >
      <SiteLayout>
        <Seo title={pageContext.name} />
        <h1>{pageContext.name}</h1>
        {children}
      </SiteLayout>
    </MDXProvider>
  );
}
export default PageTemplate;
