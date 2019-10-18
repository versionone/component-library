import { isFunction } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';

const buildCommonIconWrapperStyles = ({
  backgroundColor,
  color,
  border,
  size,
  onClick,
  theme,
}) => {
  return {
    alignItems: 'center',
    borderRadius: '50%',
    display: 'flex',
    height: size - 2,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
    userSelect: 'none',
    width: size - 2,
    ...styleUtils.conditionalStyle(
      backgroundColor,
      'background',
      backgroundColor,
      theme.Avatar.background,
    ),
    ...styleUtils.conditionalStyle(color, 'color', color, theme.Avatar.color),
    ':before': {
      borderRadius: '50%',
      content: '""',
      height: size,
      position: 'absolute',
      top: -1,
      width: size,
      zIndex: '-1',
      ...styleUtils.conditionalStyle(
        border,
        'backgroundColor',
        border,
        theme.Avatar.before,
      ),
    },
    ...styleUtils.conditionalStyle(
      isFunction(onClick),
      'cursor',
      'pointer',
      'default',
    ),
  };
};

export const IconWrapper = createComponent(
  buildCommonIconWrapperStyles,
  'span',
  ['data-component', 'data-test'],
);

export const IconButtonWrapper = createComponent(
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
