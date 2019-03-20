import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Paper } from '@versionone/components';

const Header = ({ siteTitle }) => (
  <Paper>
    <header
      style={{
        background: 'rebeccapurple',
      }}
    >
      <div
        style={{
          padding: '1.45rem 1.0875rem',
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: 'white',
              textDecoration: 'none',
            }}
          >
            {siteTitle}
          </Link>
        </h1>
      </div>
    </header>
  </Paper>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: '',
};

export default Header;
