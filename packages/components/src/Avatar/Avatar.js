import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isFunction } from 'underscore';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { LoadingSpinIcon, BrokenImageIcon } from '@versionone/icons';
import { Tooltip } from '../Tooltip';
import { SpacedGroup } from '../SpacedGroup';
import { palette } from '../palette';

const AvatarWithStatus = createComponent(
  ({ size }) => ({
    position: 'relative',
    width: size - 2,
    height: size - 2,
  }),
  'span',
);

const buildBadgeStyles = ({ border, size }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'absolute',
  width: size,
  height: size,
  minWidth: size,
  minHeight: size,
  borderRadius: '50%',
  borderWidth: 2,
  borderStyle: 'solid',
  ...styleUtils.conditionalStyle(
    Boolean(border),
    'border-color',
    border,
    'white',
  ),
});

const AvatarStatus = createComponent(
  ({ border, size, status, theme }) => ({
    ...buildBadgeStyles({ border, size }),
    bottom: 0,
    right: 0,
    background: theme.Avatar.status[status] || border,
  }),
  'span',
);

const AvatarCount = createComponent(
  ({ border, size }) => ({
    ...buildBadgeStyles({ border, size }),
    top: 0,
    right: -1 * (size / 2),
    background: palette.dove,
    fontSize: 10,
    'user-select': 'all',
    cursor: 'default',
  }),
  'span',
);

const buildCommonIconWrapperStyles = ({
  backgroundColor,
  color,
  border,
  size,
  onClick,
  theme,
}) => {
  return {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'border-radius': '50%',
    background: backgroundColor || theme.Avatar.background,
    color: color || theme.Avatar.color,
    width: size - 2,
    height: size - 2,
    position: 'relative',
    ':before': {
      content: '""',
      position: 'absolute',
      top: -1,
      'z-index': -1,
      ...styleUtils.conditionalStyle(
        border,
        'background-color',
        border,
        'white',
      ),
      'border-radius': '50%',
      width: size,
      height: size,
    },
    ...styleUtils.conditionalStyle(
      isFunction(onClick),
      'cursor',
      'pointer',
      'default',
    ),
    'user-select': 'none',
  };
};

const IconWrapper = createComponent(buildCommonIconWrapperStyles, 'span', [
  'data-component',
  'data-test',
]);

const IconButtonWrapper = createComponent(
  ({ border, size, onClick, theme }) => {
    return {
      ...buildCommonIconWrapperStyles({ border, size, onClick, theme }),
      padding: 0,
      border: 0,
      outline: 'none',
      ':focus': {
        ...theme.focused,
      },
      ':active': {
        width: size - 4,
        height: size - 4,
      },
    };
  },
  'button',
  ['onClick', 'tabIndex', 'data-component', 'data-test'],
);

const Img = createComponent(
  () => ({
    'border-radius': '50%',
  }),
  'img',
  ['src', 'srcSet', 'sizes', 'alt', 'onLoad', 'onError', 'height', 'width'],
);

const ERROR = -1;
const LOADING = 0;
const LOADED = 1;

class ImageAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageStatus: LOADING,
    };
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleImageErrored = this.handleImageErrored.bind(this);
  }

  handleImageLoaded() {
    const { shouldSimulateSlowLoad, shouldSimulateError } = this.props;

    const imageStatus = shouldSimulateError ? ERROR : LOADED;

    if (shouldSimulateSlowLoad) {
      setTimeout(() => this.setState({ imageStatus }), 2500);
    } else {
      this.setState({ imageStatus });
    }
  }

  handleImageErrored() {
    this.setState({ imageStatus: ERROR });
  }

  render() {
    const {
      size,
      Container,
      border,
      backgroundColor,
      color,
      onClick,
      tabIndex,
      'data-test': dataTest,
      src,
      srcSet,
      sizes,
      alt,
    } = this.props;
    const { imageStatus } = this.state;

    const isLoading = imageStatus === LOADING;
    const hasErrored = imageStatus === ERROR;
    const hasLoaded = imageStatus === LOADED;

    const imageWrapperSize = hasLoaded ? size : 0;
    const shouldHide = isLoading || hasErrored;
    const imageSize = shouldHide ? 0 : '100%';

    const image = (
      <Container
        size={imageWrapperSize}
        backgroundColor={backgroundColor}
        color={color}
        border={border}
        onClick={onClick}
        tabIndex={tabIndex}
        data-component="Avatar"
        data-test={dataTest}
      >
        <Img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          height={imageSize}
          width={imageSize}
          onLoad={this.handleImageLoaded}
          onError={this.handleImageErrored}
        />
      </Container>
    );

    const loading = isLoading && (
      <IconWrapper size={size} border={border}>
        <LoadingSpinIcon size={size} />
      </IconWrapper>
    );

    const brokenImageProps = {
      size,
      border,
      backgroundColor,
      color,
      'data-component': 'Avatar',
      'data-test': dataTest,
    };

    const error = hasErrored && (
      <Container {...brokenImageProps}>
        <BrokenImageAvatar {...brokenImageProps} />
      </Container>
    );

    return (
      <span>
        {image}
        {loading}
        {error}
      </span>
    );
  }
}

const BrokenImageAvatar = ({ size }) => {
  return <BrokenImageIcon size={size / 2} />;
};

const IconAvatar = props => {
  return React.cloneElement(props.icon, {
    size: (props.size * 1.2) / 3,
  });
};

const LetterAvatar = props => {
  const firstLetter = props.text.length > 0 ? props.text[0] : '';
  return firstLetter;
};

const Avatar = props => {
  const Container = isFunction(props.onClick) ? IconButtonWrapper : IconWrapper;

  const avatar = (() => {
    // image avatars must manage their own Container size based on loading states
    if (props.src)
      return (
        <ImageAvatar
          {...props}
          Container={Container}
          data-component="ImageAvatar"
        />
      );

    const avatarType = props.icon ? (
      <IconAvatar icon={props.icon} size={props.size} />
    ) : props.title ? (
      <LetterAvatar text={props.title} />
    ) : (
      <BrokenImageAvatar size={props.size} />
    );

    return (
      <Container {...props} data-component="Avatar">
        {avatarType}
      </Container>
    );
  })();

  const status = props.status && (
    <AvatarStatus
      size={Math.floor(props.size / 3)}
      border={props.border}
      status={props.status}
    />
  );

  const count = props.count > 0 && (
    <AvatarCount size={Math.floor(props.size / 2)} border={props.border}>
      {props.count}
    </AvatarCount>
  );

  const avatarWithStatus = (
    <AvatarWithStatus size={props.size}>
      {avatar}
      {status}
      {count}
    </AvatarWithStatus>
  );

  const child =
    Boolean(props.title) && props.showTooltip ? (
      <Tooltip anchor={avatarWithStatus}>
        <SpacedGroup xs={2}>{props.title}</SpacedGroup>
      </Tooltip>
    ) : (
      avatarWithStatus
    );

  return <StyleProvider>{child}</StyleProvider>;
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
};

Avatar.defaultProps = {
  size: 24,
  onClick: null,
  showTooltip: false,
  tabIndex: '0',
};

export { Avatar };
