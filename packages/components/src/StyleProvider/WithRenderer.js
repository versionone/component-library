import { Component } from 'react';
import PropTypes from 'prop-types';

class WithRenderer extends Component {
  render() {
    const { children } = this.props;
    const { renderer } = this.context;

    return children(renderer);
  }
}
WithRenderer.contextTypes = {
  renderer: PropTypes.object.isRequired,
};
WithRenderer.propTypes = {
  children: PropTypes.func.isRequired,
};
export default WithRenderer;
