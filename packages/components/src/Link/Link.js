import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';
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
  const {
    newWindow,
    color,
    disableUnderline,
    'data-test': dataTest,
    'data-trackingid': dataTrackingId,
    href,
    onClick,
    children,
  } = props;

  const rel = newWindow ? 'noopener noreferrer' : null;
  const target = newWindow ? '_blank' : null;

  return (
    <LinkImpl
      data-component="Link"
      data-trackingid={dataTrackingId}
      data-test={dataTest}
      color={color}
      disableUnderline={disableUnderline}
      href={href}
      onClick={onClick}
      rel={rel}
      target={target}
    >
      {children}
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
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Attribute used to track user interaction
   */
  'data-trackingid': PropTypes.string,
  /**
   * handle click event
   */
  onClick: PropTypes.func,
};

Link.defaultProps = {
  disableUnderline: false,
  newWindow: false,
  color: null,
  onClick: noop,
};

export { Link };
