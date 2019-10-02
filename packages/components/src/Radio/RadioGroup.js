import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';

const ROW = 'row';
const COLUMN = 'column';

class SmartGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      activeRadio: props.defaultActiveRadio,
      focusedRadio: props.defaultFocusedRadio, 
      selectRadioByIndex: index => () => {
        this.setState({
          activeRadio: index,
          focusedRadio: index,
        });
      },
      focusRadioByIndex: index => () => this.setState({ focusedRadio: index }),
    };
  }

  render() {
    const {props} = this;
    const count = React.Children.count(props.children);
    
    return React.Children.map(props.children, (child, index) => {
      const isSelected = parseInt(this.state.activeRadio) === index;
      const isFocused = parseInt(this.state.focusedRadio) === index;
      const id = props.name.concat('-', index);

      const radioProps = {
        key: index,
        id,
        controls: `${index}-radio`,
        selected: isSelected,
        onClick: this.state.selectRadioByIndex(index),
        onChange: props.onChange,
        selectRadioByIndex: this.state.selectRadioByIndex,
        onFocus: this.state.focusRadioByIndex(index),
        onBlur: this.state.focusRadioByIndex(null),
        focused: isFocused,
        tabIndex: isSelected ? '0' : '-1',
        count,
        name: props.name,
      };

      return React.cloneElement(child, radioProps);
    });
  }
}

SmartGroup.propTypes = {
};

const RadioGroup = props => {
  return (
    <div
      data-component="RadioGroup"
      data-test={props['data-test']}
      role="radiogroup"
      name={props.name}
      style={{ 
        flexDirection: props.direction,
        display: "flex" }
      }>
      <SmartGroup {...props}>{props.children}</SmartGroup>
    </div>
  );
};

RadioGroup.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Collection of Radio instances
   */
  children: PropTypes.node,
  /**
   * Collection of Radio instances
   */
  direction: PropTypes.oneOf([ROW, COLUMN]),
    /**
   * Index of the active radio before user interaction
   */
  defaultActiveRadio: PropTypes.number,
  /**
   * Index of the focused radio before user interaction
   */
  defaultFocusedRadio: PropTypes.number,
  /**
   * Function called when a radio is clicked
   */
  handleSelection: PropTypes.func,
  /**
   * Unique Identifier of group
   */
  name: PropTypes.string.isRequired,
    /**
   *  Function called when a radio is changed
   */
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  defaultActiveRadio: 0,
  defaultFocusedRadio: null,
  direction: ROW,
  handleSelection: noop,
  onChange: noop,
};

export { RadioGroup };
