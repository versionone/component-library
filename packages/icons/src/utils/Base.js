import React from 'react';
import PropTypes from 'prop-types';
import { WithTheme } from '@versionone/components';

const Base = ({ color, icon: Icon, size, ...rest }) => (
  <WithTheme>
  {theme => {
      return (
        <Icon
      style={{
        display: 'inline-flex',
        fill: theme.Icon.main,
        height: `${size}px`,
        width: `${size}px`,
      }}
      title={Icon.displayName}
      {...rest}
      data-component="Icon"
    />
      );
    }}
  </WithTheme>
);
Base.propTypes = {
  /** Size dimensions of icon. */
  size: PropTypes.number,
  /** Title of icon. */
  title: PropTypes.string,
};
Base.defaultProps = {
  size: 24,
};
export { Base };
