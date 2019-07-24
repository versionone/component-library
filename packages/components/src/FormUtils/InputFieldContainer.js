import { createComponent, styleUtils } from '../StyleProvider';

export default createComponent(
  ({
    inlineEdit,
    success,
    dirty,
    error,
    disabled,
    focused,
    fullWidth,
    stretch,
    multiline,
    height,
    isHeightCapped,
    theme,
  }) => ({
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 6,
    boxSizing: 'border-box',
    //minHeight: height,
    ...styleUtils.conditionalStyle(multiline, 'minHeight', height - 4, height),
    ...styleUtils.conditionalStyle(isHeightCapped, 'height', height),
    alignItems: 'center',
    ...styleUtils.conditionalStyle(
      dirty,
      'background-color',
      theme.Form.dirty.main,
      theme.Form.background,
    ),
    ...styleUtils.conditionalStyles(disabled, 'cursor', 'not-allowed'),
    ...styleUtils.conditionalStyle(
      disabled,
      'border-color',
      theme.Form.disabled.main,
    ),
    ...styleUtils.conditionalStyle(
      focused,
      'border-color',
      theme.Form.focused.main,
    ),
    ...styleUtils.conditionalStyle(
      error,
      'border-color',
      theme.Form.error.main,
    ),
    ...styleUtils.conditionalStyle(
      inlineEdit,
      'border-color',
      theme.Form.inline.main,
    ),
    ...styleUtils.conditionalStyle(
      !(inlineEdit || disabled || focused || error),
      'border-color',
      theme.Form.borderColor,
    ),
    ...styleUtils.conditionalStyle(
      fullWidth || stretch,
      'display',
      'flex',
      'inline-flex',
    ),
    ...styleUtils.conditionalStyle(focused, 'outline', 'inherit', 'none'),
    ...styleUtils.conditionalStyle(
      focused,
      'box-shadow',
      theme.focused.boxShadow,
    ),
    ':hover': {
      ...styleUtils.conditionalStyle(
        disabled,
        'border-color',
        theme.Form.disabled.main,
      ),
      ...styleUtils.conditionalStyle(
        success,
        'border-color',
        theme.Form.success.main,
      ),
      ...styleUtils.conditionalStyle(
        error,
        'border-color',
        theme.Form.error.main,
      ),
      ...styleUtils.conditionalStyle(
        !(disabled || success || error),
        'border-color',
        theme.Form.inline.mainHighlight,
      ),
      ...styleUtils.conditionalStyle(inlineEdit, 'border-style', 'dashed'),
    },
  }),
  'div',
  ['innerRef', 'onMouseEnter', 'onMouseLeave', 'onClick'],
);
