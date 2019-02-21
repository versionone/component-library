import React from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';

const Playground = ({
  'data-test': dataTest,
  __code,
  __position,
  __scope,
  ...otherProps
}) => {
  return (
    <div data-test={dataTest} data-component="Playground">
      <LiveProvider code={__code} position={__position} scope={__scope}>
        <LiveEditor />
        <LiveError />
        <LivePreview />
      </LiveProvider>
    </div>
  );
};
export default Playground;
