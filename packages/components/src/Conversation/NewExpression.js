import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { createComponent } from '../StyleProvider';

const NewExpressionImpl = createComponent(() => ({}), 'div', [
  'data-component',
  'data-test',
  'role',
]);

class NewExpression extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { 'data-test': dataTest } = this.props;
    return (
      <NewExpressionImpl data-component="NewExpression" data-test={dataTest} />
    );
  }
}

NewExpression.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

NewExpression.defaultProps = {};

export { NewExpression };
