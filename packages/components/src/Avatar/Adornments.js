import { createComponent, styleUtils } from '../StyleProvider';
import { palette } from '../palette';

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

export const AvatarStatus = createComponent(
  ({ border, size, status, theme }) => ({
    ...buildBadgeStyles({ border, size }),
    bottom: 0,
    right: 0,
    background: theme.Avatar.status[status] || border,
  }),
  'span',
);

export const AvatarCount = createComponent(
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
