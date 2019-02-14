import React from 'react';
import { Base } from './Base';

const withIconProps = Component => props => (
  <Base {...props} icon={Component} />
);
export default withIconProps;
