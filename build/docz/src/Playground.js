import React, { Fragment } from 'react';
import CodeMirror from 'codemirror';
import { Playground } from 'docz';

CodeMirror.defaults.viewportMargin = Infinity;

export default ({ children, 'data-test': dataTest, ...rest }) => (
  <div data-test={dataTest}>
    <Playground {...rest}>
      <Fragment>{children}</Fragment>
    </Playground>
  </div>
);
