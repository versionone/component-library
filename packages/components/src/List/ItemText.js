import PropTypes from 'prop-types';
import React, { cloneElement } from 'react';
import { isFunction, isString } from 'underscore';
import { Clamp } from '../Clamp';
import { Typography } from '../Typography';
import { createComponent } from '../StyleProvider';

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
  return (
    <Root>
      <Clamp>
        <PrimaryContent>
          <Typography is="span" variant="base">
            {stopClickPropagationOnChildren(primary)}
          </Typography>
        </PrimaryContent>
      </Clamp>
      {Boolean(secondary) && (
        <Clamp>
          <Typography is="span" variant="small">
            {stopClickPropagationOnChildren(secondary)}
          </Typography>
        </Clamp>
      )}
      {Boolean(tertiary) && (
        <Clamp>
          <Typography is="span" variant="small">
            {stopClickPropagationOnChildren(tertiary)}
          </Typography>
        </Clamp>
      )}
    </Root>
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
