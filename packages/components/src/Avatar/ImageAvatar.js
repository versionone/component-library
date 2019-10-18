import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { LoadingSpinIcon } from '@versionone/icons';
import { createComponent } from '../StyleProvider';
import { BrokenImageAvatar } from './BrokenImageAvatar';
import { IconWrapper } from './IconWrapper';

const Img = createComponent(
  () => ({
    'border-radius': '50%',
    margin: 0,
    padding: 0,
  }),
  'img',
  ['src', 'srcSet', 'sizes', 'alt', 'onLoad', 'onError', 'height', 'width'],
);

const ERROR = -1;
const LOADING = 0;
const LOADED = 1;

export class ImageAvatar extends Component {
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

ImageAvatar.propTypes = {
  /**
   * Development only
   */
  shouldSimulateSlowLoad: PropTypes.bool,
  /**
   * Development only
   */
  shouldSimulateError: PropTypes.bool,
  /**
   * Set the size of the avatar.
   */
  size: PropTypes.oneOf([12, 16, 24, 28, 32, 36, 42]),
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
   * tabIndex of the avatar
   */
  tabIndex: PropTypes.string,
  /**
   * Attribute for test suite
   */
  'data-test': PropTypes.string,
  /**
   * Function called when the avatar is selected
   */
  onClick: PropTypes.func,
  /**
   * Reserved for AvatarGroups.
   */
  border: PropTypes.string,
  /**
   * Reserved for AvatarGroups.
   */
  backgroundColor: PropTypes.string,
  /**
   * Reserved for AvatarGroups.
   */
  color: PropTypes.string,
  /**
   * Container component for the loaded image
   */
  Container: PropTypes.any,
};

ImageAvatar.defaultProps = {
  size: 24,
  onClick: null,
  tabIndex: '0',
  shouldSimulateError: false,
  shouldSimulateSlowLoad: false,
};
