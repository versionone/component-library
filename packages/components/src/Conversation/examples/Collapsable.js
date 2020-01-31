import React from 'react';
import { AvatarIcon, AssetIcon } from '@versionone/icons';
import { Avatar } from '../../Avatar';
import { Chip } from '../../Chip';
import { Conversation, Expression } from '../index';

const collapsedExpressions = [
  <Expression
    authorAvatar={<Avatar icon={<AvatarIcon />} />}
    authorName="Jim"
    authorDate="5 min ago"
    message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
    mentions={[
      <Chip avatar={<Avatar icon={<AssetIcon />} />}>Some Asset</Chip>,
      <Chip avatar={<Avatar icon={<AssetIcon />} />}>Another Asset</Chip>,
    ]}
  />,
  <Expression
    authorAvatar={
      <Avatar src="https://i.pinimg.com/236x/c1/2e/ba/c12eba2c171e51501c00759b3363367c--dapper-suits-bloomberg-businessweek.jpg" />
    }
    authorName="Walker"
    authorDate="4 min ago"
    message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
  />,
];

export class Collapsable extends React.Component {
  constructor() {
    super();
    this.state = {
      expanded: false,
      expressions: [
        <Expression
          authorAvatar={<Avatar icon={<AvatarIcon />} />}
          authorName="Jim"
          authorDate="2 min ago"
          message="is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets"
          mentions={[
            <Chip avatar={<Avatar icon={<AssetIcon />} />}>Some Asset</Chip>,
            <Chip avatar={<Avatar icon={<AssetIcon />} />}>Another Asset</Chip>,
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
    };
    this.handleExpand = this.handleExpand.bind(this);
  }

  handleExpand() {
    this.setState(state => ({
      expanded: true,
      expressions: [...collapsedExpressions, ...state.expressions],
    }));
  }

  render() {
    const { expanded, expressions } = this.state;
    return (
      <Conversation
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
          expressions,
          count: 2,
        }}
        collapsedCount={3}
        expanded={expanded}
        onExpand={this.handleExpand}
      />
    );
  }
}
