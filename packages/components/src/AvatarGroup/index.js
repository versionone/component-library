import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider } from '../StyleProvider';
import { Avatar } from '../Avatar';
import { List } from '../List';
import { Menu } from '../Menu';
import { OnClickOutside } from '../OnClickOutside';

const OverlapedGroup = createComponent(
  ({ disabledGutter }) => ({
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    '> *': {
      'margin-left': -10,
    },
    '> *:first-child': {
      'margin-left': 0,
    },

    //'margin-left': 12,
  }),
  'div',
  ['data-component', 'data-test'],
);

const GridGroup = createComponent(
  ({}) => ({
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    '> *': {
      'margin-left': 4,
    },
    '> *:first-child': {
      'margin-left': 0,
    },
  }),
  'div',
  ['data-component', 'data-test'],
);

const AvatarWrapper = createComponent(
  ({ zIndex, size, theme }) => ({
    'z-index': zIndex,
    width: size,
    height: size,
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    justifyConent: 'center',
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    border: 0,
    borderRadius: '50%',
    border: '1px solid transparent',
  }),
  'span',
  ['onClick'],
);

class AvatarGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { isOpen: false };
    this.openMoreMenu = this.openMoreMenu.bind(this);
    this.closeMoreMenu = this.closeMoreMenu.bind(this);
    this.toggleMoreMenu = this.toggleMoreMenu.bind(this);
  }

  openMoreMenu() {
    this.setState({ isOpen: true });
  }

  closeMoreMenu() {
    this.setState({ isOpen: false });
  }

  toggleMoreMenu() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    const props = this.props;
    const avatarCount = React.Children.count(props.children);
    const exceedsThreshold =
      props.maxCount !== null && avatarCount > props.maxCount;
    const moreCount = exceedsThreshold
      ? `${avatarCount - props.maxCount}`
      : null;

    const moreAvatar = (
      <AvatarWrapper zIndex={0} size={props.size}>
        <Avatar
          size={props.size}
          border={props.border}
          title={moreCount}
          onClick={this.toggleMoreMenu}
        />
      </AvatarWrapper>
    );

    const allAvatars = React.Children.toArray(props.children);

    const visibleAvatars = allAvatars.slice(
      0,
      exceedsThreshold ? props.maxCount : avatarCount,
    );

    const hiddenAvatars = allAvatars.slice(props.maxCount, avatarCount + 1);

    const moreAvatarListItems = hiddenAvatars.map((a, i) => {
      return (
        <List.Item
          key={i}
          onClick={a.props.onClick}
          tabIndex={0}
          icon={
            <Avatar src={a.props.src} title={a.props.title} size={props.size} />
          }
        >
          <List.ItemText primary={a.props.title} />
        </List.Item>
      );
    });

    const avatarMenu = exceedsThreshold && (
      <Menu
        anchor={moreAvatar}
        open={this.state.isOpen}
        onClickOutside={this.closeMoreMenu}
        height="200"
      >
        <List bordered>{moreAvatarListItems}</List>
      </Menu>
    );

    const Grouping = props.disableOverlap ? GridGroup : OverlapedGroup;

    const avatars = visibleAvatars.map((child, i) => (
      <AvatarWrapper key={i} zIndex={avatarCount - i} size={props.size}>
        {React.cloneElement(child, {
          size: props.size,
          border: props.border,
          showTooltip: props.showTooltip,
        })}
      </AvatarWrapper>
    ));

    return (
      <StyleProvider>
        <OnClickOutside handleClickOutside={this.closeMoreMenu}>
          <Grouping
            direction="horizontal"
            disableGutter
            xs={4}
            data-component={
              props.disableOverlap ? 'GridGroup' : 'OverlapedGroup'
            }
          >
            {avatars}
            {avatarMenu}
          </Grouping>
        </OnClickOutside>
      </StyleProvider>
    );
  }
}

AvatarGroup.propTypes = {
  /**
   * Avatars to group
   */
  children: PropTypes.node.isRequired,
  /**
   * Size of each avatar (including border)
   */
  size: PropTypes.number,
  /**
   * If true the avatars will not be shown on top one another
   */
  disableOverlap: PropTypes.bool,
  /**
   * Number of avatars shown in group before collapsing into a (+n)
   */
  maxCount: PropTypes.number,
  /**
   * Border color between avatars in the group. Used when the spaced between avatars needs to match the background color of their parent
   */
  border: PropTypes.string,
  /**
   * If true will render a tooltip for each Avatar
   */
  showTooltip: PropTypes.bool,
};

AvatarGroup.defaultProps = {
  size: 42,
  disableOverlap: false,
  maxCount: null,
  border: 'white',
  showTooltip: false,
};

export { AvatarGroup };
