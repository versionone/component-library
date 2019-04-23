import React from 'react';
import { Link } from 'gatsby';
import { createComponent, SpacedGroup } from '@versionone/components';

const NavHeading = createComponent(() => ({}), 'h4');
const NavLink = createComponent(() => ({}), Link, ['to']);

const Navigation = ({ items }) => (
  <nav>
    {items.map(({ name, pages }) => (
      <SpacedGroup key={name} direction="vertical" xs={4} md={16}>
        <NavHeading>{name}</NavHeading>
        <SpacedGroup key={`menu-${name}`} direction="vertical">
          {pages.map(page => (
            <NavLink key={page.id} to={page.fields.slug}>
              {page.frontmatter.name}
            </NavLink>
          ))}
        </SpacedGroup>
      </SpacedGroup>
    ))}
  </nav>
);
Navigation.defaultProps = {
  items: [],
};
export default Navigation;
