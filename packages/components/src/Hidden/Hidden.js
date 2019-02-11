import React from 'react';
import { StyleProvider, createComponent, styleUtils } from '../StyleProvider';

const ContentVisibility = createComponent(
  ({ 'aria-hidden': visuallyHidden }) => ({
    ...styleUtils.conditionalStyle(!visuallyHidden, 'visibility', 'hidden'),
    ...styleUtils.conditionalStyle(!visuallyHidden, 'display', 'none'),
  }),
  'div',
  ['aria-hidden'],
);

const VisuallyHidden = ({ children }) => (
  <StyleProvider>
    <ContentVisibility aria-hidden={false}>{children}</ContentVisibility>
  </StyleProvider>
);

const HiddenFromScreenReaders = ({ children }) => (
  <StyleProvider>
    <ContentVisibility aria-hidden={true}>{children}</ContentVisibility>
  </StyleProvider>
);

export { HiddenFromScreenReaders, VisuallyHidden };
