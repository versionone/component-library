import React from 'react';
import { isFunction } from 'util';
import { Code } from '@versionone/components';

const Playground = ({
  __code,
  __position,
  __scope,
  children,
  ...otherProps
}) => (
  <div>
    <div {...otherProps} data-component="Playground">
      {isFunction(children) ? children() : children}
    </div>
    <Code language="jsx">{__code}</Code>
  </div>
);
export default Playground;
