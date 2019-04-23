import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../../StyleProvider';
import { SpacedGroup } from '../../SpacedGroup';
import { palette } from '../../palette';
import { Typography } from '../../Typography';

const UnderlineTabImpl = createComponent(
  ({ placement, selected, disabled, focused, theme }) => {
    return {
      ...styleUtils.conditionalStyle(disabled, 'opacity', '0.5'),
      ...styleUtils.conditionalStyle(
        disabled,
        'cursor',
        'not-allowed',
        'pointer',
      ),
      [`border-${placement}-style`]: 'solid',
      [`border-${placement}-width`]: 3,
      ...styleUtils.conditionalStyle(
        selected,
        `border-${placement}-color`,
        palette.obsidian,
        palette.transparent,
      ),
      ...styleUtils.conditionalStyle(
        selected,
        'color',
        palette.obsidian,
        palette.dove,
      ),
      ...(focused ? theme.focused : {}),
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const UnderlineTab = props => {
  const {
    'data-test': dataTest,
    disabled,
    focused,
    icon,
    placement,
    selected,
    title,
  } = props;

  const spacing = icon ? 4 : 0;
  return (
    <UnderlineTabImpl
      data-component="Tabs.UnderlineTab"
      data-test={dataTest}
      selected={selected}
      disabled={disabled}
      focused={focused}
      placement={placement}
    >
      <SpacedGroup xs={spacing} center>
        {icon}
        <Typography>{title}</Typography>
      </SpacedGroup>
    </UnderlineTabImpl>
  );
};

UnderlineTab.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * If true the tab is selected
   */
  selected: PropTypes.bool,
  /**
   * If true the tab is disabled
   */
  disabled: PropTypes.bool,
  /**
   * If true the tab is focused
   */
  focused: PropTypes.bool,
  /**
   * Title of the tab
   */
  title: PropTypes.string,
  /**
   * Icon of the tab
   */
  icon: PropTypes.node,
  /**
   * Placement of the underline relative to the title
   */
  placement: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
};

UnderlineTab.defaultProps = {
  selected: false,
  disabled: false,
  focused: false,
  title: '',
  icon: null,
  placement: 'bottom',
};

export default UnderlineTab;
