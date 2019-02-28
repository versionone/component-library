import React from 'react';
import Prism from 'prismjs';
import { isFunction } from 'util';

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
    <pre className="language-jsx">
      <code
        className="language-jsx"
        dangerouslySetInnerHTML={{
          __html: Prism.highlight(__code, Prism.languages.javascript, 'jsx'),
        }}
      />
    </pre>
  </div>
);
export default Playground;
