import PropTypes from 'prop-types';
import React from 'react';
import { noop, isFunction } from 'underscore';
import { createComponent, styleUtils } from '../StyleProvider';
import { Focusable } from '../Focusable';
import { Arrow } from '../Arrow';

const HeaderButton = createComponent(
  ({ disabled, isFirst, isLast, open, focused, theme }) => {
    const focusedStyles = focused
      ? {
          ...theme.focused,
          ...styleUtils.conditionalStyle(isFirst, 'border-top-left-radius', 7),
          ...styleUtils.conditionalStyle(
            !open && isLast,
            'border-bottom-left-radius',
            7,
          ),
          ...styleUtils.conditionalStyle(isFirst, 'border-top-right-radius', 7),
          ...styleUtils.conditionalStyle(
            !open && isLast,
            'border-bottom-right-radius',
            7,
          ),
        }
      : {};

    return {
      margin: 0,
      padding: 0,
      width: '100%',
      height: '100%',
      background: 'transparent',
      border: 0,
      ...styleUtils.conditionalStyle(
        disabled,
        'cursor',
        'not-allowed',
        'pointer',
      ),
      ...styleUtils.conditionalStyle(disabled, 'color', 'rgba(0,0,0,.25)'),
      outline: 'none',
      ...focusedStyles,
    };
  },
  'button',
  [
    'type',
    'onClick',
    'onBlur',
    'onFocus',
    'focused',
    'aria-expanded',
    'aria-disabled',
    'aria-controls',
    'tabIndex',
  ],
);

const Container = createComponent(
  ({ bordered, isFirst, isLast, open, status, disabled, theme }) => {
    return {
      'line-height': '22px',
      height: 40,
      ...styleUtils.padding(0),
      ...styleUtils.conditionalStyle(
        disabled,
        'cursor',
        'not-allowed',
        'pointer',
      ),
      ...styleUtils.conditionalStyle(disabled, 'color', 'rgba(0,0,0,.25)'),
      ...styleUtils.conditionalStyle(isFirst, 'border-top-left-radius', 7),
      ...styleUtils.conditionalStyle(
        !open && isLast,
        'border-bottom-left-radius',
        7,
      ),
      ...styleUtils.conditionalStyle(isFirst, 'border-top-right-radius', 7),
      ...styleUtils.conditionalStyle(
        !open && isLast,
        'border-bottom-right-radius',
        7,
      ),
      ...styleUtils.conditionalStyle(
        bordered,
        'background-color',
        theme.Collapse.main,
        'transparent',
      ),
      ...styleUtils.conditionalStyle(
        status !== 'default',
        'border-left',
        `3px solid ${theme.Collapse.status[status]}`,
      ),
    };
  },
  'dt',
  ['role', 'data-component', 'data-test'],
);

const IconPlaceholder = createComponent(
  () => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    maxHeight: 24,
    width: 24,
    minWidth: 24,
  }),
  'span',
);

const Header = ({
  accordionId,
  bordered,
  children,
  'data-test': dataTest,
  disabled,
  focused,
  handleSelection,
  isFirst,
  isLast,
  onBlur,
  onFocus,
  open,
  status,
}) => {
  const arrow = (
    <IconPlaceholder>
      <Arrow open={open} is="span" />
    </IconPlaceholder>
  );

  const childProps = {
    arrow,
  };

  return (
    <Focusable focused={focused} onBlur={onBlur} onFocus={onFocus}>
      {({ focused, bind, ref }) => (
        <Container
          bordered={bordered}
          open={open}
          isFirst={isFirst}
          isLast={isLast}
          status={status}
          disabled={disabled}
          role="heading"
          data-component="AccordionHeader"
          data-test={dataTest}
        >
          <HeaderButton
            isFirst={isFirst}
            isLast={isLast}
            open={open}
            disabled={disabled}
            aria-expanded={open}
            aria-disabled={disabled}
            aria-controls={accordionId}
            tabIndex={disabled ? '-1' : '0'}
            focused={focused}
            onFocus={disabled ? noop : bind.onFocus}
            onBlur={disabled ? noop : bind.onBlur}
            onClick={disabled ? noop : handleSelection}
            type="button"
            innerRef={ref}
          >
            {isFunction(children)
              ? children(childProps)
              : React.cloneElement(children, childProps)}
          </HeaderButton>
        </Container>
      )}
    </Focusable>
  );
};

Header.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

export default Header;
