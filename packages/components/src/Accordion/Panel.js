import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { createComponent, styleUtils, WithTheme } from '../StyleProvider';
import { Divider } from '../Divider';

const Content = createComponent(
  ({ disablePadding, open, status, theme }) => {
    const openStyles = open
      ? {
          height: 'auto',
        }
      : {
          height: 0,
          opacity: 0,
          padding: 0,
          visibility: 'hidden',
        };

    return {
      margin: 0,
      ...styleUtils.conditionalStyle(disablePadding, 'padding', 0, 20),
      ...styleUtils.conditionalStyle(
        status !== 'default',
        'border-left',
        `3px solid ${theme.Collapse.status[status]}`,
      ),
      ...openStyles,
    };
  },
  'dd',
  ['role', 'aria-labelledby', 'data-component'],
);

const Panel = props => {
  return (
    <WithTheme>
      {theme => {
        const border =
          props.status !== 'default'
            ? `3px solid ${theme.Collapse.status[props.status]}`
            : null;

        const topDivider = !props.disableDividers &&
          (props.open || !props.isLast) && <Divider borderLeft={border} />;

        const bottomDivider = !props.disableDividers &&
          props.open &&
          !props.isLast && <Divider borderLeft={border} />;

        return (
          <Fragment>
            {topDivider}
            <Content
              open={props.open}
              isFirst={props.isFirst}
              isLast={props.isLast}
              disablePadding={props.disablePadding}
              status={props.status}
              role="region"
              aria-labelledby={props.accoridionId}
              data-component="Collapse.PanelContent"
              data-test={props['data-test']}
            >
              {props.children}
            </Content>
            {bottomDivider}
          </Fragment>
        );
      }}
    </WithTheme>
  );
};

Panel.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
};

export default Panel;
