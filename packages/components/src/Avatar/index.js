import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { isFunction } from 'underscore';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { LoadingSpinIcon, BrokenImageIcon } from '../Icons';
import { Tooltip } from '../Tooltip';
import SpacedGroup from '../SpacedGroup';

const AvatarWithStatus = createComponent(
  ({ size }) => ({
    position: 'relative',
    width: size - 2,
    height: size - 2,
  }),
  'span',
);

const AvatarStatus = createComponent(
  ({ border, size, status, theme }) => ({
    position: 'absolute',
    bottom: 0,
    right: 0,
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
    background: theme.Avatar.status[status] || border,
  }),
  'span',
);

const buildCommonIconWrapperStyles = ({ border, size, onClick, theme }) => {
  return {
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    'border-radius': '50%',
    background: theme.Avatar.background,
    color: theme.Avatar.color,
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

const AvatarPlaceHolder = createComponent(
  ({ border, size, onClick, theme }) => {
    return {
      ...buildCommonIconWrapperStyles({ border, size, onClick, theme }),
      background: 'transparent',
    };
  },
  'span',
  ['data-component', 'data-test'],
);

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
    const props = this.props;
    const imageStatus = this.state.imageStatus;
    const isLoading = imageStatus === LOADING;
    const hasErrored = imageStatus === ERROR;
    const hasLoaded = imageStatus === LOADED;

    const imageWrapperSize = hasLoaded ? props.size : 0;
    const shouldHide = isLoading || hasErrored;
    const imageSize = shouldHide ? 0 : '100%';

    const IconWrapperImpl = isFunction(props.onClick)
      ? IconButtonWrapper
      : IconWrapper;

    const image = (
      <AvatarPlaceHolder
        size={imageWrapperSize}
        border={props.border}
        data-component={props['data-component']}
        data-test={props['data-test']}
      >
        <IconWrapperImpl
          size={imageWrapperSize}
          border={props.border}
          onClick={props.onClick}
          tabIndex={props.tabIndex}
        >
          <Img
            src={props.src}
            srcSet={props.srcSet}
            sizes={props.sizes}
            alt={props.alt}
            height={imageSize}
            width={imageSize}
            onLoad={this.handleImageLoaded}
            onError={this.handleImageErrored}
          />
        </IconWrapperImpl>
      </AvatarPlaceHolder>
    );

    const loading = isLoading && (
      <IconWrapper size={props.size} border={props.border}>
        <LoadingSpinIcon size={props.size} />
      </IconWrapper>
    );

    const error = hasErrored && (
      <BrokenImageAvatar size={props.size} border={props.border} />
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

const BrokenImageAvatar = props => {
  const IconWrapperImpl = isFunction(props.onClick)
    ? IconButtonWrapper
    : IconWrapper;

  return (
    <AvatarPlaceHolder {...props}>
      <IconWrapperImpl {...props}>
        <BrokenImageIcon size={props.size / 2} />
      </IconWrapperImpl>
    </AvatarPlaceHolder>
  );
};

const LetterAvatar = props => {
  const firstLetter = props.text.length > 0 ? props.text[0] : '';
  const IconWrapperImpl = isFunction(props.onClick)
    ? IconButtonWrapper
    : IconWrapper;
  return (
    <AvatarPlaceHolder {...props}>
      <IconWrapperImpl {...props}>{firstLetter}</IconWrapperImpl>
    </AvatarPlaceHolder>
  );
};

const Avatar = props => {
  const avatar = (() => {
    if (props.src)
      return <ImageAvatar {...props} data-component="ImageAvatar" />;
    if (props.title)
      return (
        <LetterAvatar
          size={props.size}
          border={props.border}
          onClick={props.onClick}
          text={props.title}
          data-component="LetterAvatar"
        />
      );
    return <BrokenImageAvatar {...props} />;
  })();

  const status = props.status && (
    <AvatarStatus
      size={Math.floor(props.size / 3)}
      border={props.border}
      status={props.status}
    />
  );

  const avatarWithStatus = (
    <AvatarWithStatus size={props.size}>
      {avatar}
      {status}
    </AvatarWithStatus>
  );

  const child =
    Boolean(props.title) && props.showTooltip ? (
      <Tooltip anchor={avatarWithStatus}>
        <SpacedGroup xs={2}>
          <span>{props.title}</span>
        </SpacedGroup>
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
