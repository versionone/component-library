import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../StyleProvider';

const LinkImpl = createComponent(
  ({ color, disableUnderline, theme }) => ({
    color: color || theme.Link.main,
    'text-decoration': 'none',
    ':hover': {
      color: theme.Link.mainHighlight,
      ...styleUtils.conditionalStyle(
        disableUnderline,
        'text-decoration',
        'none',
        'underline',
      ),
    },
    ':focus': {
      ...theme.focused,
    },
  }),
  'a',
  ['data-component', 'data-test', 'href', 'onClick', 'rel', 'target'],
);

const Link = props => {
  const targetProps = props.newWindow
    ? {
        rel: 'noopener noreferrer',
        target: '_blank',
      }
    : {};

  return (
    <LinkImpl {...props} {...targetProps} data-component="Link">
      {props.children}
    </LinkImpl>
  );
};

Link.propTypes = {
  /**
   * URL the link navigates to
   */
  href: PropTypes.string.isRequired,
  /**
   * Text of the link
   */
  children: PropTypes.string.isRequired,
  /**
   * If true the link will not be underlined on hover
   */
  disableUnderline: PropTypes.bool,
  /**
   * If true the link opens a new window or tab
   */
  newWindow: PropTypes.bool,
  /**
   * Reserved for Tags. Color of the link
   */
  color: PropTypes.string,
};

Link.defaultProps = {
  disableUnderline: false,
  newWindow: false,
  color: null,
};

export { Link };
