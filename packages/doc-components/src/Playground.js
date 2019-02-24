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
    <LiveProvider code={__code} position={__position} scope={__scope}>
      <LiveEditor />
      <LiveError />
      <div data-test={dataTest} data-component="Playground">
        <LivePreview />
      </div>
    </LiveProvider>
  );
};
export default Playground;
