import PropTypes from 'prop-types';
import React from 'react';
import { createComponent, StyleProvider } from '../StyleProvider';
import { Grid } from '../Grid';
import { SpacedGroup } from '../SpacedGroup';

const Impl = createComponent(
  ({ theme }) => {
    return {
      color: theme.EmptyState.main,
    };
  },
  'div',
  ['data-component', 'data-test'],
);

const Title = createComponent(
  () => ({
    'font-size': '1.429em',
    'font-weight': '300',
  }),
  'h2',
);

const EmptyState = props => {
  const icon = Boolean(props.icon) && (
    <Impl {...props}>
      {React.createElement(props.icon, {
        size: 72,
      })}
    </Impl>
  );

  return (
    <StyleProvider>
      <div data-component="EmptyState" data-test={props['data-test']}>
        <SpacedGroup xs={8}>
          <Grid direction="row" justify="center" alignItems="center">
            {icon}
          </Grid>
          <Grid direction="row" justify="center" alignItems="center">
            <Title>{props.title}</Title>
          </Grid>
          <Grid direction="row" justify="center" alignItems="center">
            {props.children}
          </Grid>
          <Grid direction="row" justify="center" alignItems="center">
            {props.primaryAction}
          </Grid>
        </SpacedGroup>
      </div>
    </StyleProvider>
  );
};

EmptyState.propTypes = {
  /**
   * Additional guidance to help the user. Assume this won't be read
   */
  children: PropTypes.node,
  /**
   * Main message to guide user to using feature
   */
  title: PropTypes.string.isRequired,
  /**
   * Action the user can take to resolve the empty state
   */
  primaryAction: PropTypes.node,
  /**
   * Icon that explains the empty state
   */
  icon: PropTypes.element,
};

EmptyState.defaultProps = {};

export { EmptyState };
