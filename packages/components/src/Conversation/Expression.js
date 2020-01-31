import PropTypes from 'prop-types';
import React, { PureComponent, cloneElement } from 'react';
import { createComponent } from '../StyleProvider';
import { Avatar } from '../Avatar';
import { SpacedGroup } from '../SpacedGroup';
import { Typography } from '../Typography';

const Container = createComponent(
  () => ({
    display: 'flex',
    flexDirection: 'row',
  }),
  'div',
  ['data-component', 'data-test', 'role'],
);

const LeftColumn = createComponent(
  () => ({
    display: 'flex',
    justifyContent: 'center',
    width: '40px',
    margin: '0 4px',
  }),
  'div',
);

const RightColumn = createComponent(() => ({ flex: 1 }), 'div');

class Expression extends PureComponent {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const {
      'data-test': dataTest,
      authorAvatar,
      authorName,
      authorDate,
      message,
      mentions,
    } = this.props;

    const header = (
      <SpacedGroup direction="vertical" xs={0}>
        {typeof authorName === 'string' ? (
          <Typography>{authorName}</Typography>
        ) : (
          authorName
        )}
        <Typography variant="small">{authorDate}</Typography>
      </SpacedGroup>
    );

    return (
      <Container data-component="Expression" data-test={dataTest}>
        <LeftColumn>{cloneElement(authorAvatar, { size: 32 })}</LeftColumn>
        <RightColumn>
          <SpacedGroup direction="vertical">
            {header}
            <Typography>{message}</Typography>
            <SpacedGroup xs={4}>
              {mentions.map(mention => cloneElement(mention, { size: 28 }))}
            </SpacedGroup>
          </SpacedGroup>
        </RightColumn>
      </Container>
    );
  }
}

Expression.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Avatar of member who authored the expression
   */
  authorAvatar: PropTypes.node,
  /**
   * Name of the member who authored the expression
   */
  authorName: PropTypes.node.isRequired,
  /**
   * Date the expression was authored
   */
  authorDate: PropTypes.string.isRequired,
  /**
   * Contents of the expression
   */
  message: PropTypes.string.isRequired,
  /**
   * items related to the message
   */
  mentions: PropTypes.arrayOf(PropTypes.node),
};

Expression.defaultProps = {
  authorAvatar: <Avatar />,
  mentions: [],
};

export { Expression };
