import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Expander } from '../Expander';
import { OnClickOutside } from '../OnClickOutside';
import { SpacedGroup } from '../SpacedGroup';
import { TextField } from '../TextField';

const Container = createComponent(() => ({}), 'div', [
  'data-component',
  'data-test',
  'role',
]);

class Conversation extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      replying: props.defaultReplying,
    };
  }

  handleClickOutside = event => {
    const { replyMessage } = this.props;
    if (!replyMessage) {
      this.handleCancelReply(event);
    }
  };

  handleInitiateReply = event => {
    const { onInitiateReply } = this.props;
    this.setState(() => ({ replying: true }));
    onInitiateReply(event);
  };

  handleCancelReply = event => {
    const { onCancelReply } = this.props;
    this.setState(() => ({ replying: false }));
    onCancelReply(event);
  };

  render() {
    const {
      'data-test': dataTest,
      collapsedCount,
      expanded,
      onExpand,
      onReplyChanged,
      onShare,
      replyMessage,
      thread,
      topic,
    } = this.props;

    const { replying } = this.state;

    const replies = (
      <SpacedGroup direction="vertical">{thread.expressions}</SpacedGroup>
    );

    const collapsedThread = !expanded && collapsedCount > 0 && (
      <Expander
        title={`${collapsedCount} earlier Replies`}
        expandedTitle="Hide Details"
        onToggle={onExpand}
        expanded={expanded}
      />
    );

    const reply = (
      <OnClickOutside handleClickOutside={this.handleClickOutside}>
        <TextField
          multiline
          fullWidth
          hintText="continue the conversation"
          onFocus={this.handleInitiateReply}
          value={replyMessage}
          onChange={onReplyChanged}
        />
      </OnClickOutside>
    );

    const actions = replying && (
      <SpacedGroup>
        <Button type="secondary" onClick={onShare}>
          Share
        </Button>
        <Button onClick={this.handleCancelReply}>Cancel</Button>
      </SpacedGroup>
    );

    return (
      <Container data-component="Conversation" data-test={dataTest}>
        {topic}
        <Divider />
        {collapsedThread}
        {replies}
        {reply}
        {actions}
      </Container>
    );
  }
}

Conversation.propTypes = {
  /**
   * Number of expression in the thread that are collapsed
   */
  collapsedCount: PropTypes.number,
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * A reply to the conversation is intiated before user interaction
   */
  defaultReplying: PropTypes.bool,
  /**
   * If true then collapsed thread is visible
   */
  expanded: PropTypes.bool,
  /**
   * Invoked when a reply is canceled
   */
  onCancelReply: PropTypes.func,
  /**
   * Invoked when collapsed thread is expanded
   */
  onExpand: PropTypes.func,
  /**
   * Invokded when reply is initiated
   */
  onInitiateReply: PropTypes.func,
  /**
   * Invoked when reply message changes
   */
  onReplyChanged: PropTypes.func,
  /**
   * Invoked when an expression is shared
   */
  onShare: PropTypes.func,
  /**
   * Contents of the reply
   */
  replyMessage: PropTypes.string,
  /**
   * collection of expresssion
   */
  thread: PropTypes.shape({
    expressions: PropTypes.arrayOf(PropTypes.node),
    count: PropTypes.number,
  }),
  /**
   * Original expression
   */
  topic: PropTypes.node,
};

Conversation.defaultProps = {
  collapsedCount: 0,
  expanded: false,
  onCancelReply: noop,
  onExpand: noop,
  onInitiateReply: noop,
  onReplyChanged: noop,
  onShare: noop,
  thread: {
    expressions: [],
    count: 0,
  },
  topic: null,
};

export { Conversation };
