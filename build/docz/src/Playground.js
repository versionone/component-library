import React from 'react';
import CodeMirror from 'codemirror';
import { Playground } from 'docz';

CodeMirror.defaults.viewportMargin = Infinity;

export default ({ 'data-test': dataTest, ...rest }) => (
  <div data-test={dataTest}>
    <Playground {...rest} />
  </div>
);
