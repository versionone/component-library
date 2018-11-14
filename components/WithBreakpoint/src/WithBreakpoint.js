import PropTypes from 'prop-types';
import withWidth from '@material-ui/core/withWidth';

const WithBreakpoint = withWidth()(props => props.children(props.width));
WithBreakpoint.propTypes = {
  /**
   * function that receives the current breakpoint
   */
  children: PropTypes.func.isRequired,
};
WithBreakpoint.defaultProps = {};

export default WithBreakpoint;
