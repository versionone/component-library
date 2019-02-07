import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import DetectExternalEvents from '../DetectExternalEvents';

const OnClickOutside = props => {
  return (
    <DetectExternalEvents
      domEvents={['click']}
      reactEvents={['onClick']}
      onExternalEvent={props.handleClickOutside}
    >
      {props.children}
    </DetectExternalEvents>
  );
};

OnClickOutside.propTypes = {
  /**
   * Function run when the user clicks outside the children
   */
  handleClickOutside: PropTypes.func,
  /**
   * UI that is considered "inside". When clicking on the children handleClickOutside is NOT triggered
   */
  children: PropTypes.node,
};

OnClickOutside.defaultProps = {
  handleClickOutside: noop,
};

export default OnClickOutside;
