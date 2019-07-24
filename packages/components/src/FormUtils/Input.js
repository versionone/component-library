import { createComponent, styleUtils } from '../StyleProvider';

const buildInputStyles = ({ multiline, dirty, disabled, height, theme }) => ({
  'background-color': dirty ? theme.Form.dirty.main : theme.Form.background,
  alignItems: 'center',
  border: 'none',
  borderRadius: '6px',
  display: 'flex',
  flex: 'auto',
  ...styleUtils.conditionalStyle(disabled, 'cursor', 'not-allowed'),
  ...styleUtils.conditionalStyle(
    multiline,
    'min-height',
    height - 4,
    height - 2,
  ),
  ...styleUtils.conditionalStyle(multiline, 'resize', 'vertical'),
  ...styleUtils.conditionalStyle(!multiline, 'height', height - 2),
  ...styleUtils.padding(multiline ? 8 : 0, 0, 0, 4),
  margin: 0,
  ':focus': {
    outline: 'none',
  },
});

const passThroughProps = [
  'defaultValue',
  'disabled',
  'onBlur',
  'onChange',
  'onFocus',
  'onKeyDown',
  'placeholder',
  'tabIndex',
  'password',
  'type',
  'value',
  'aria-activedescendant',
  'aria-autocomplete',
  'aria-controls',
  'aria-labelledby',
  'autoComplete',
  'id',
  'rows',
];

export const Input = createComponent(
  buildInputStyles,
  'input',
  passThroughProps,
);

export const Textarea = createComponent(
  buildInputStyles,
  'textarea',
  passThroughProps,
);
