import React from 'react';
import Seo from './Seo';
import SiteLayout from './SiteLayout';

function PageTemplate({ children, pageContext }) {
  return (
    <SiteLayout>
      <Seo title={pageContext.name} />
      <h1>{pageContext.name}</h1>
      {children}
    </SiteLayout>
  );
}
export default PageTemplate;
