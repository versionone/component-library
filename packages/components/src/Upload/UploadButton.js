import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { UploadIcon } from '@versionone/icons';
import { Button } from '../Button';

export const UploadButton = ({ onClick, disabled, children }) => (
  <Fragment>
    <Button onClick={onClick} disabled={disabled}>
      <UploadIcon />
      Upload
    </Button>
    {React.cloneElement(children, {
      tabIndex: -1,
    })}
  </Fragment>
);

UploadButton.propTypes = {
  /**
   * click event handler
   */
  onClick: PropTypes.func,
  /**
   * If `true` then user interaction is disabled
   */
  disabled: PropTypes.bool,
  /**
   * Hidden control
   */
  children: PropTypes.node.isRequired,
};

UploadButton.defaultProps = {
  disabled: false,
  onClick: noop,
};
