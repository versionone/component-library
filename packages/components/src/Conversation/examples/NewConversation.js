import React from 'react';
import { Conversation, NewExpression } from '../index';
import { MentionLookup } from '../../MultiSelect/examples/MentionLookup';

export class NewConversation extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.handleReplayChange = this.handleReplayChange.bind(this);
    this.handleShare = this.handleShare.bind(this);
  }

  handleReplayChange(event) {
    this.setState({
      message: event.target.value,
    });
  }

  handleShare(event) {
    console.warn('share', event);
  }

  render() {
    const { message } = this.state;
    return (
      <Conversation>
        <NewExpression
          data-test="new-conversation"
          hintText="Start a conversation"
          message={message}
          onMessageChanged={this.handleReplayChange}
          onShare={this.handleShare}
        >
          <MentionLookup />
        </NewExpression>
      </Conversation>
    );
  }
}
