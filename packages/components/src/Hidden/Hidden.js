import React from 'react';
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

const HiddenFromScreenReaders = ({ children }) => (
  <ContentVisibility aria-hidden>{children}</ContentVisibility>
);

export { HiddenFromScreenReaders, VisuallyHidden };
