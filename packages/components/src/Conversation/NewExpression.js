import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { noop } from 'underscore';
import { createComponent } from '../StyleProvider';
import { Button } from '../Button';
import { OnClickOutside } from '../OnClickOutside';
import { SpacedGroup } from '../SpacedGroup';
import { TextField } from '../TextField';

const Container = createComponent(() => ({}), 'div', [
  'data-component',
  'data-test',
]);

class NewExpression extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      writing: Boolean(props.defaultMessage),
    };
  }

  handleClickOutside = event => {
    const { message } = this.props;
    if (!message) {
      this.handleCancelWriting(event);
    }
  };

  handleInitiateWriting = event => {
    const { onInitiateWriting } = this.props;
    this.setState(() => ({ writing: true }));
    onInitiateWriting(event);
  };

  handleCancelWriting = event => {
    const { onCancelWriting } = this.props;
    this.setState(() => ({ writing: false }));
    onCancelWriting(event);
  };

  render() {
    const {
      children,
      'data-test': dataTest,
      hintText,
      message,
      onMessageChanged,
      onShare,
    } = this.props;

    const { writing } = this.state;

    const reply = (
      <OnClickOutside handleClickOutside={this.handleClickOutside}>
        <TextField
          multiline
          height={100}
          fullWidth
          hintText={hintText}
          onFocus={this.handleInitiateWriting}
          value={message}
          onChange={onMessageChanged}
        />
      </OnClickOutside>
    );

    const actions = writing && (
      <SpacedGroup>
        <Button
          type="secondary"
          onClick={onShare}
          disabled={!message}
          data-trackingid="conversations-share-expression"
        >
          Share
        </Button>
        <Button
          onClick={this.handleCancelWriting}
          data-trackingid="conversations-cancel-writing"
        >
          Cancel
        </Button>
      </SpacedGroup>
    );

    return (
      <Container data-component="NewExpression" data-test={dataTest}>
        <SpacedGroup direction="vertical" xs={4} disableGutter>
          {reply}
          {children}
        </SpacedGroup>
        {actions}
      </Container>
    );
  }
}

NewExpression.propTypes = {
  /**
   * Mention lookup
   */
  children: PropTypes.node.isRequired,
  /**
   * Writing prompt
   */
  hintText: PropTypes.string,
  /**
   * The message of the expression beforeuser interaction
   */
  defaultMessage: PropTypes.string,
  /**
   * Invoked when a reply is canceled
   */
  onCancelWriting: PropTypes.func,
  /**
   * Invokded when new expression is initiated
   */
  onInitiateWriting: PropTypes.func,
  /**
   * Invoked when expression's message changes
   */
  onMessageChanged: PropTypes.func,
  /**
   * Invoked when an expression is shared
   */
  onShare: PropTypes.func,
  /**
   * Contents of the new expresssion
   */
  message: PropTypes.string,
};

NewExpression.defaultProps = {
  hintText: '',
  onCancelWriting: noop,
  onInitiateWriting: noop,
  onMessageChanged: noop,
  onShare: noop,
};

export { NewExpression };
