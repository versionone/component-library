import PropTypes from 'prop-types';
import React from 'react';
import FocusContext from './FocusContext';
import uuid from 'uuid/v4';
import FocusLock from './FocusLock';

class FocusGroup extends React.Component {
  constructor(props) {
    super(props);
    this.id = uuid();
  }

  render() {
    const { children, 'data-test': dataTest, disableLock } = this.props;

    return (
      <FocusContext.Consumer>
        {({ currentGroupId, onFocus }) => (
          <FocusLock
            data-test={dataTest}
            disabled={
              currentGroupId === null ||
              this.id !== currentGroupId ||
              disableLock
            }
          >
            {children({
              onFocus: evt => {
                onFocus(evt, this.id);
              },
            })}
          </FocusLock>
        )}
      </FocusContext.Consumer>
    );
  }
}
FocusGroup.propTypes = {
  /** Receives bind (onFocus) which should be applied to any element to be tracked within the group. */
  children: PropTypes.func.isRequired,
  /** Used for testing. */
  'data-test': PropTypes.string,
  /** When true, disables the focus lock on the group. */
  disableLock: PropTypes.bool,
};
FocusGroup.defaultProps = {
  disableLock: false,
};
export default FocusGroup;
