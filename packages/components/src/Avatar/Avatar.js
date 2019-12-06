import PropTypes from 'prop-types';
import React from 'react';
import { isFunction } from 'underscore';
import { createComponent } from '../StyleProvider';
import { Tooltip } from '../Tooltip';
import { SpacedGroup } from '../SpacedGroup';
import { BrokenImageAvatar } from './BrokenImageAvatar';
import { IconAvatar } from './IconAvatar';
import { ImageAvatar } from './ImageAvatar';
import { LetterAvatar } from './LetterAvatar';
import { IconWrapper, IconButtonWrapper } from './IconWrapper';
import { AvatarStatus, AvatarCount } from './Adornments';

const AvatarWithStatus = createComponent(
  ({ size }) => ({
    position: 'relative',
    width: size - 2,
    height: size - 2,
  }),
  'span',
);

const Avatar = props => {
  const {
    onClick,
    src,
    srcSet,
    icon,
    size,
    sizes,
    title,
    border,
    status,
    color,
    backgroundColor,
    count,
    showTooltip,
    tabIndex,
    alt,
  } = props;

  const Container = isFunction(onClick) ? IconButtonWrapper : IconWrapper;

  const avatar = (() => {
    // image avatars must manage their own Container size based on loading states
    if (src)
      return (
        <ImageAvatar
          color={color}
          backgroundColor={backgroundColor}
          size={size}
          title={title}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          tabIndex={tabIndex}
          onClick={onClick}
          border={border}
          Container={Container}
          data-component="ImageAvatar"
        />
      );

    const avatarType = (() => {
      if (icon) {
        return <IconAvatar icon={icon} size={size} color={color} />;
      }
      if (title) {
        return <LetterAvatar text={title} />;
      }
      return <BrokenImageAvatar size={size} />;
    })();

    return (
      <Container
        border={border}
        size={size}
        onClick={onClick}
        backgroundColor={backgroundColor}
        color={color}
        data-component="Avatar">
        {avatarType}
      </Container>
    );
  })();

  const avatarStatus = status && (
    <AvatarStatus size={Math.floor(size / 3)} border={border} status={status} />
  );

  const avatarCount = count > 0 && (
    <AvatarCount size={Math.floor(size / 2)} border={border}>
      {count}
    </AvatarCount>
  );

  const avatarWithStatus = (
    <AvatarWithStatus size={size}>
      {avatar}
      {avatarStatus}
      {avatarCount}
    </AvatarWithStatus>
  );

  if (title && showTooltip) {
    return (
      <Tooltip anchor={avatarWithStatus}>
        <SpacedGroup xs={2}>{title}</SpacedGroup>
      </Tooltip>
    );
  }

  return avatarWithStatus;
};

Avatar.propTypes = {
  /**
   * Set the size of the avatar.
   */
  size: PropTypes.oneOf([12, 16, 24, 28, 32, 36, 42]),
  /**
   * Use to render LetterAvatars or IconAvatars
   */
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * Title of the avatar (Likely the name of the Memeber)
   */
  title: PropTypes.string,
  /**
   * Set the url of the image
   */
  src: PropTypes.string,
  /**
   * Set the set of images we will allow the browser to choose between, and what size each image is.
   */
  srcSet: PropTypes.string,
  /**
   * Set the set of media conditions (e.g. screen widths) and indicates what image size would be best to choose
   */
  sizes: PropTypes.string,
  /**
   * Set the alternative text if the image can not be displayed.
   */
  alt: PropTypes.string,
  /**
   * Reserved for AvatarGroups. Apply border color
   */
  border: PropTypes.string,
    /**
   * Background Color 
   */
  backgroundColor: PropTypes.string,
    /**
   * Color for IconAvatar
   */
  color: PropTypes.string,
  /**
   * Function called when the avatar is selected
   */
  onClick: PropTypes.func,
  /**
   * If true will render a tooltip for the Avatar
   */
  showTooltip: PropTypes.bool,
  /**
   * tabIndex of the avatar
   */
  tabIndex: PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
};

Avatar.defaultProps = {
  size: 24,
  onClick: null,
  showTooltip: false,
  tabIndex: '0',
};

export { Avatar };
