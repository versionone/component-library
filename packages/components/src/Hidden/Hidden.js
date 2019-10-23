import React from 'react';
import PropTypes from 'prop-types';
import { createComponent, styleUtils } from '../StyleProvider';

const ContentVisibility = createComponent(
  ({ 'aria-hidden': visuallyHidden }) => ({
    ...styleUtils.conditionalStyle(!visuallyHidden, 'visibility', 'hidden'),
    ...styleUtils.conditionalStyle(!visuallyHidden, 'display', 'none'),
  }),
  'div',
  ['aria-hidden'],
);

const VisuallyHidden = ({ children }) => (
  <ContentVisibility aria-hidden={false}>{children}</ContentVisibility>
);

VisuallyHidden.propTypes = {
  /**
   * component to visually hide
   */
  children: PropTypes.node,
};

const HiddenFromScreenReaders = ({ children }) => (
  <ContentVisibility aria-hidden>{children}</ContentVisibility>
);

HiddenFromScreenReaders.propTypes = {
  /**
   * component to hide from screen readers, but show visually
   */
  children: PropTypes.node,
};

export { HiddenFromScreenReaders, VisuallyHidden };
