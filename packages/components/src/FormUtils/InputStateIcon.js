import React from 'react';
import { Tooltip } from '../Tooltip';
import { createComponent, styleUtils } from '../StyleProvider';
import {
  EditIcon,
  AlertIcon,
  CheckIconIcon,
  LoadingSpinIcon,
} from './../Icons';
import palette from './../palette';
import SpacedGroup from '../SpacedGroup';

const IconContainer = createComponent(
  () => {
    return {
      display: 'flex',
      alignItems: 'center',
      alignSelf: 'stretch',
      ...styleUtils.padding(0, 6, 0, 0),
    };
  },
  'span',
  ['onMouseEnter', 'onMouseExit'],
);

export default props => {
  const { inlineEdit, disabled, success, hovered, loading, error } = props;

  const showIcon = !inlineEdit || hovered;

  const inlineEditIcon = disabled ? null : success ? (
    <CheckIconIcon
      size={12}
      color={showIcon ? palette.shamrock : palette.transparent}
    />
  ) : loading ? (
    <LoadingSpinIcon
      size={12}
      color={showIcon ? palette.gunmetal : palette.transparent}
    />
  ) : error ? (
    <Tooltip
      anchor={
        <AlertIcon
          size={12}
          color={showIcon ? palette.sunset : palette.transparent}
        />
      }
    >
      <SpacedGroup xs={2}>
        <span>{error}</span>
      </SpacedGroup>
    </Tooltip>
  ) : inlineEdit ? (
    <EditIcon
      size={12}
      color={showIcon ? palette.cerulean : palette.transparent}
    />
  ) : null;

  const container = inlineEditIcon && (
    <IconContainer success={success} error={error}>
      {inlineEditIcon}
    </IconContainer>
  );

  return container;
};
