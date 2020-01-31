import React from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { DetectExternalEvents } from '../DetectExternalEvents';

const OnClickOutside = ({ handleClickOutside, children }) => {
  return (
    <DetectExternalEvents
      data-component="OnClickOutside"
      domEvents={['click']}
      reactEvents={['onClick']}
      onExternalEvent={handleClickOutside}
    >
      {children}
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

export { OnClickOutside };
