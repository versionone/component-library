import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

const BorderImpl = createComponent(
  ({ color, width, borderStyle, radius, theme }) => ({
    'border-style': borderStyle,
    'border-width': width,
    'border-color': color,
    ...styleUtils.conditionalStyle(radius !== null, 'border-radius', radius),
  }),
  'div',
  ['data-component', 'data-test'],
);

const Border = props => {
  // rename style prop
  const attributes = { ...props };
  attributes.borderStyle = props.style;
  delete attributes.style;

  const children = props.disable ? (
    props.children
  ) : (
    <BorderImpl {...attributes} data-component="Border" />
  );
  return <StyleProvider>{children}</StyleProvider>;
};

Border.propTypes = {
  /**
   *
   * If true the border is not applied
   */
  disable: PropTypes.bool,
  /**
   * Color of the border
   */
  color: PropTypes.string,
  /**
   * Width of the border
   */
  width: PropTypes.number,
  /**
   * style of the border
   */
  style: PropTypes.string,
  /**
   * border radius applied
   */
  radius: PropTypes.number,
};

Border.defaultProps = {
  disable: false,
  color: palette.dove,
  width: 1,
  style: 'solid',
  radius: null,
};

export { Border };
