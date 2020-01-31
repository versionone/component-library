import React from 'react';
import {
  EditIcon,
  AlertIcon,
  CheckIcon,
  LoadingSpinIcon,
} from '@versionone/icons';
import { Tooltip } from '../Tooltip';
import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';
import { SpacedGroup } from '../SpacedGroup';

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
  const { inlineEdit, disabled, success, loading, error } = props;

  const inlineEditIcon = (() => {
    if (disabled) return null;
    if (loading) return <LoadingSpinIcon size={12} color={palette.gunmetal} />;
    if (success) return <CheckIcon size={12} color={palette.shamrock} />;
    if (error)
      return (
        <Tooltip anchor={<AlertIcon size={12} color={palette.sunset} />}>
          <SpacedGroup xs={2}>
            <span>{error}</span>
          </SpacedGroup>
        </Tooltip>
      );
    if (inlineEdit) return <EditIcon size={12} color={palette.cerulean} />;
    return null;
  })();

  return (
    inlineEditIcon && (
      <IconContainer success={success} error={error}>
        {inlineEditIcon}
      </IconContainer>
    )
  );
};
