import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { isFunction, isString } from 'underscore';
import { Clamp } from '../Clamp';
import { createComponent, StyleProvider } from '../StyleProvider';

const PrimaryContent = createComponent(
  ({ theme }) => ({
    color: theme.ListItemText.main,
  }),
  'span',
);
const Root = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  }),
  'div',
);

const stopClickPropagationOnChildren = children => {
  if (isString(children)) {
    return children;
  }
  return cloneElement(children, {
    onClick: evt => {
      evt.stopPropagation();
      if (isFunction(children.props.onClick)) {
        children.props.onClick(evt);
      }
    },
  });
};

const ListItemText = ({ primary, secondary, tertiary }) => {
  const hasTertiaryContent = Boolean(tertiary);

  return (
    <StyleProvider>
      <Root>
        <Clamp>
          <PrimaryContent>
            {stopClickPropagationOnChildren(primary)}
          </PrimaryContent>
        </Clamp>
        {Boolean(secondary) && (
          <Clamp>{stopClickPropagationOnChildren(secondary)}</Clamp>
        )}
        {hasTertiaryContent && (
          <Clamp>{stopClickPropagationOnChildren(tertiary)}</Clamp>
        )}
      </Root>
    </StyleProvider>
  );
};

ListItemText.propTypes = {
  /** Top line of content */
  primary: PropTypes.node.isRequired,
  /** Second line of content */
  secondary: PropTypes.node,
  /** Third line of content */
  tertiary: PropTypes.node,
};

ListItemText.defaultProps = {
  secondary: null,
  tertiary: null,
};

export default ListItemText;
