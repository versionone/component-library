import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, styleUtils } from '../../StyleProvider';
import { SpacedGroup } from '../../SpacedGroup';
import { Typography } from '../../Typography';

const NubTabImpl = createComponent(
  ({ selected, disabled, theme }) => {
    return {
      position: 'relative',
      ...styleUtils.conditionalStyle(disabled, 'opacity', '0.5'),
      ...styleUtils.conditionalStyle(
        disabled,
        'cursor',
        'not-allowed',
        'pointer',
      ),
      ...styleUtils.conditionalStyle(
        selected,
        'color',
        theme.NubTab.color.selected,
        theme.NubTab.color.unselected,
      ),
      ...styleUtils.conditionalStyle(selected, ':after', {
        content: '""',
        backgroundColor: theme.Paper.background,
        position: 'absolute',
        width: '9px',
        height: '9px',
        bottom: '-15px',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        left: '55%',
      }),
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const NubTab = props => {
  const { 'data-test': dataTest, disabled, icon, selected, title } = props;

  const spacing = 4;
  return (
    <NubTabImpl
      data-component="Tabs.NubTab"
      data-test={dataTest}
      selected={selected}
      disabled={disabled}
    >
      <SpacedGroup xs={spacing} center>
        {icon}
        <Typography>{title}</Typography>
      </SpacedGroup>
    </NubTabImpl>
  );
};

NubTab.propTypes = {
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
   * Title of the tab
   */
  title: PropTypes.string,
  /**
   * Icon of the tab
   */
  icon: PropTypes.node,
};

NubTab.defaultProps = {
  selected: false,
  disabled: false,
  title: '',
  icon: null,
};

export { NubTab };
