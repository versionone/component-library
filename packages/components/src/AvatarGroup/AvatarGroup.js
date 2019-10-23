import PropTypes from 'prop-types';
import React from 'react';
import { createComponent } from '../StyleProvider';
import { Avatar } from '../Avatar';
import { List, ListItem, ListItemText } from '../List';
import { Menu } from '../Menu';
import { OnClickOutside } from '../OnClickOutside';

const OverlapedGroup = createComponent(
  () => ({
    display: 'flex',
    'flex-direction': 'row',
    'align-items': 'center',
    '> *': {
      'margin-left': -10,
    },
    '> *:first-child': {
      'margin-left': 0,
    },
  }),
  'div',
  ['data-component', 'data-test'],
);

const GridGroup = createComponent(
  () => ({
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
  ({ zIndex, size }) => ({
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
    this.setState(state => ({ isOpen: !state.isOpen }));
  }

  render() {
    const {
      children,
      maxCount,
      size,
      border,
      disableOverlap,
      showTooltip,
    } = this.props;
    const { isOpen } = this.state;
    const avatarCount = React.Children.count(children);
    const exceedsThreshold = maxCount !== null && avatarCount > maxCount;
    const moreCount = exceedsThreshold ? `${avatarCount - maxCount}` : null;

    const moreAvatar = (
      <AvatarWrapper zIndex={0} size={size}>
        <Avatar
          size={size}
          border={border}
          title={moreCount}
          onClick={this.toggleMoreMenu}
        />
      </AvatarWrapper>
    );

    const allAvatars = React.Children.toArray(children);

    const visibleAvatars = allAvatars.slice(
      0,
      exceedsThreshold ? maxCount : avatarCount,
    );

    const hiddenAvatars = allAvatars.slice(maxCount, avatarCount + 1);

    const moreAvatarListItems = hiddenAvatars.map((a, i) => {
      return (
        <ListItem
          key={i}
          onClick={a.props.onClick}
          tabIndex={0}
          icon={<Avatar src={a.props.src} title={a.props.title} size={size} />}
        >
          <ListItemText primary={a.props.title} />
        </ListItem>
      );
    });

    const avatarMenu = exceedsThreshold && (
      <Menu
        anchor={moreAvatar}
        open={isOpen}
        onClickOutside={this.closeMoreMenu}
        height="200"
      >
        <List bordered>{moreAvatarListItems}</List>
      </Menu>
    );

    const Grouping = disableOverlap ? GridGroup : OverlapedGroup;

    const avatars = visibleAvatars.map((child, i) => (
      <AvatarWrapper key={i} zIndex={avatarCount - i} size={size}>
        {React.cloneElement(child, {
          size,
          border,
          showTooltip,
        })}
      </AvatarWrapper>
    ));

    return (
      <OnClickOutside handleClickOutside={this.closeMoreMenu}>
        <Grouping
          direction="horizontal"
          disableGutter
          xs={4}
          data-component={disableOverlap ? 'GridGroup' : 'OverlapedGroup'}
        >
          {avatars}
          {avatarMenu}
        </Grouping>
      </OnClickOutside>
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
