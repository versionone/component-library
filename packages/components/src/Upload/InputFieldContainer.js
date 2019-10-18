import { createComponent, styleUtils } from '../StyleProvider';

export const InputFieldContainer = createComponent(
  ({ disabled, focused, theme }) => ({
    'background-color': theme.Upload.main,
    borderWidth: '1px',
    borderStyle: 'dashed',
    ...styleUtils.conditionalStyle(
      focused,
      'border-color',
      theme.Form.focused.main,
    ),
    ...styleUtils.conditionalStyle(
      disabled,
      'border-color',
      theme.Form.disabled.main,
    ),
    ':hover': {
      ...styleUtils.conditionalStyle(
        !disabled,
        'border-color',
        theme.Form.focused.main,
      ),
    },
    ...styleUtils.conditionalStyle(
      focused,
      'box-shadow',
      theme.focused.boxShadow,
    ),
    ...styleUtils.conditionalStyle(focused, 'outline', 'none', 'inherit'),
    borderRadius: 6,
    boxSizing: 'border-box',
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    '> *': {
      height: '100%',
      'margin-top': 8,
      'margin-bottom': 8,
    },
  }),
  'div',
);
