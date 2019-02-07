import PropTypes from 'prop-types';
import React from 'react';
import { noop, isFunction } from 'underscore';
import { createComponent, styleUtils, StyleProvider } from '../StyleProvider';
import Arrow from '../Arrow';

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

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.ref = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.focused !== nextProps.focused) {
      const method = nextProps.focused ? 'focus' : 'blur';
      this.ref.current[method]();
    }
  }

  render() {
    const props = this.props;
    const arrow = (
      <IconPlaceholder>
        <Arrow open={props.open} is="span" />
      </IconPlaceholder>
    );

    const childProps = {
      arrow,
    };

    const children = isFunction(props.children)
      ? props.children(childProps)
      : React.cloneElement(props.children, childProps);

    return (
      <StyleProvider>
        <Container
          bordered={props.bordered}
          open={props.open}
          isFirst={props.isFirst}
          isLast={props.isLast}
          status={props.status}
          disabled={props.disabled}
          role="heading"
          data-component="Accordion.Header"
          data-test={props['data-test']}
        >
          <HeaderButton
            isFirst={props.isFirst}
            isLast={props.isLast}
            open={props.open}
            disabled={props.disabled}
            aria-expanded={props.open}
            aria-disabled={props.disabled}
            aria-controls={props.accoridionId}
            tabIndex={props.disabled ? '-1' : '0'}
            focused={props.focused ? true : undefined}
            onFocus={props.disabled ? noop : props.handleFocus}
            onBlur={props.disabled ? noop : props.handleBlur}
            onClick={props.disabled ? noop : props.handleSelection}
            type="button"
            innerRef={this.ref}
          >
            {children}
          </HeaderButton>
        </Container>
      </StyleProvider>
    );
  }
}

Header.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

export default Header;
