import React from 'react';
import { createComponent } from '../StyleProvider';

const RequiredText = createComponent(
  ({ theme }) => ({
    color: theme.Label.required.main,
  }),
  'span',
);

class RequiredIndicator extends React.Component{
  render(){
    return <RequiredText> *</RequiredText>
  }
}

export { RequiredIndicator };
