import PropTypes from 'prop-types';
import { Component } from 'react';

class WithRenderer extends Component {
  render() {
    const { children } = this.props;
    const { renderer } = this.context;

    return children(renderer);
  }
}
WithRenderer.propTypes = {
  children: PropTypes.func.isRequired,
};
// eslint-disable-next-line react/forbid-prop-types
WithRenderer.contextTypes = { renderer: PropTypes.object };

export default WithRenderer;
