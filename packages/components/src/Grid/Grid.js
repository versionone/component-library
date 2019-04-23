import PropTypes from 'prop-types';
import { createComponent } from '../StyleProvider';

const Grid = createComponent(
  ({ alignContent, alignItems, direction, justify, wrap }) => ({
    alignContent,
    alignItems,
    boxSizing: 'border-box',
    flexDirection: direction,
    display: 'flex',
    flexBasis: '100%',
    flexGrow: 0,
    justifyContent: justify,
    maxWidth: '100%',
    width: '100%',
    flexWrap: wrap,
  }),
  'div',
);

Grid.propTypes = {
  /**
   * Defines the align-content style property. It's applied for all screen sizes.
   */
  alignContent: PropTypes.oneOf([
    'stretch',
    'center',
    'flex-start',
    'flex-end',
    'space-between',
    'space-around',
  ]),
  /**
   * Defines the align-items style property. It's applied for all screen sizes.
   */
  alignItems: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'stretch',
    'baseline',
  ]),
  /**
   * The Column(s) of the component.
   */
  children: PropTypes.node,
  /**
   * Defines the flex-direction style property. It is applied for all screen sizes.
   */
  direction: PropTypes.oneOf([
    'row',
    'row-reverse',
    'column',
    'column-reverse',
  ]),
  /**
   * Defines the justify-content style property. It is applied for all screen sizes.
   */
  justify: PropTypes.oneOf([
    'flex-start',
    'center',
    'flex-end',
    'space-between',
    'space-around',
    'space-evenly',
  ]),
  /**
   * Defines the flex-wrap style property. It's applied for all screen sizes.
   */
  wrap: PropTypes.oneOf(['nowrap', 'wrap', 'wrap-reverse']),
};

Grid.defaultProps = {
  alignContent: 'stretch',
  alignItems: 'stretch',
  direction: 'row',
  justify: 'flex-start',
  wrap: 'wrap',
};

export { Grid };
