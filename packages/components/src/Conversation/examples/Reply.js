import React from 'react';
import { AvatarIcon, AssetIcon } from '@versionone/icons';
import { Avatar } from '../../Avatar';
import { Chip } from '../../Chip';
import { Conversation, Expression } from '../index';

export class Reply extends React.Component {
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
      <Conversation
        replyMessage={message}
        onReplyChanged={this.handleReplayChange}
        onShare={this.handleShare}
        topic={
          <Expression
            authorAvatar={
              <Avatar src="https://i.pinimg.com/236x/c1/2e/ba/c12eba2c171e51501c00759b3363367c--dapper-suits-bloomberg-businessweek.jpg" />
            }
            authorName="Walker"
            authorDate="5 min ago"
            message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
          />
        }
        thread={{
          expressions: [
            <Expression
              authorAvatar={<Avatar icon={<AvatarIcon />} />}
              authorName="Jim"
              authorDate="2 min ago"
              message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
              mentions={[
                <Chip avatar={<Avatar icon={<AssetIcon />} />}>
                  Some Asset
                </Chip>,
                <Chip avatar={<Avatar icon={<AssetIcon />} />}>
                  Another Asset
                </Chip>,
              ]}
            />,
            <Expression
              authorAvatar={
                <Avatar src="https://i.pinimg.com/236x/c1/2e/ba/c12eba2c171e51501c00759b3363367c--dapper-suits-bloomberg-businessweek.jpg" />
              }
              authorName="Walker"
              authorDate="1 min ago"
              message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
            />,
          ],
          count: 2,
        }}
      />
    );
  }
}
