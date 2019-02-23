import React from 'react';
import { Link } from 'gatsby';
import {
  createComponent,
  SpacedGroup,
  StyleProvider,
} from '@versionone/components';

const NavHeading = createComponent(() => ({}), 'h4');
const NavLink = createComponent(() => ({}), Link, ['to']);

const Navigation = ({ items }) => (
  <StyleProvider>
    <nav>
      {items.map(([heading, pages]) => (
        <SpacedGroup key={heading} direction="vertical" xs={4} md={16}>
          <NavHeading>{heading}</NavHeading>
          <SpacedGroup key={heading} direction="vertical">
            {pages.map(page => (
              <NavLink key={page.id} to={page.fields.slug}>
                {page.frontmatter.name}
              </NavLink>
            ))}
          </SpacedGroup>
        </SpacedGroup>
      ))}
    </nav>
  </StyleProvider>
);

export default Navigation;
