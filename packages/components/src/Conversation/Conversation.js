import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';
import { Divider } from '../Divider';
import { Expander } from '../Expander';
import { SpacedGroup } from '../SpacedGroup';

const Container = createComponent(() => ({}), 'div', [
  'data-component',
  'data-test',
]);

class Conversation extends PureComponent {
  render() {
    const {
      'data-test': dataTest,
      children,
      collapsedCount,
      expanded,
      onExpand,
      topic,
    } = this.props;

    const collapsedThread = !expanded && collapsedCount > 0 && (
      <Expander
        title={`${collapsedCount} earlier Replies`}
        expandedTitle="Hide Details"
        onToggle={onExpand}
        expanded={expanded}
      />
    );

    const thread = <SpacedGroup direction="vertical">{children}</SpacedGroup>;

    const conversation = topic
      ? [topic, <Divider />, collapsedThread, thread]
      : thread;

    return (
      <Container data-component="Conversation" data-test={dataTest}>
        {conversation}
      </Container>
    );
  }
}

Conversation.propTypes = {
  /**
   * Expressions in the thread followed by a New Expression or Reply control
   */
  children: PropTypes.node,
  /**
   * Number of expression in the thread that are collapsed
   */
  collapsedCount: PropTypes.number,
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * If true then collapsed thread is visible
   */
  expanded: PropTypes.bool,
  /**
   * Invoked when collapsed thread is expanded
   */
  onExpand: PropTypes.func,
  /**
   * Original expression
   */
  topic: PropTypes.node,
};

Conversation.defaultProps = {
  collapsedCount: 0,
  expanded: false,
  onExpand: noop,
  topic: null,
};

export { Conversation };
