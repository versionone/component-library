import PropTypes from 'prop-types';
import React, { PureComponent, memo } from 'react';
import { isEmpty, last } from 'underscore';
import FocusContext from './FocusContext';

const history = [];
let currentGroupId = null;

const ManagedFocus = memo(({ children, pop }) => children(pop));

class FocusManager extends PureComponent {
  constructor(props) {
    super(props);

    this.onFocus = this.onFocus.bind(this);
    this.pop = this.pop.bind(this);
  }

  render() {
    const { children } = this.props;
    return (
      <FocusContext.Provider value={{ currentGroupId, onFocus: this.onFocus }}>
        <ManagedFocus pop={this.pop}>{children}</ManagedFocus>
      </FocusContext.Provider>
    );
  }

  onFocus(evt, groupId) {
    evt.persist();
    if (!history.find(h => h.groupId === groupId)) {
      currentGroupId = groupId;
      history.push({ groupId, evt });
      this.forceUpdate();
    }
  }

  pop() {
    if (isEmpty(history)) {
      return;
    }
    history.pop();
    const currentGroup = last(history);
    if (!currentGroup) {
      currentGroupId = null;
      return;
    }
    currentGroupId = currentGroup.groupId;
    this.forceUpdate(() => currentGroup.evt.target.focus());
  }
}
FocusManager.propTypes = {
  /** Receives function to navigate back through focus group history. */
  children: PropTypes.func.isRequired,
};
export { FocusManager };
