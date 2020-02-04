import PropTypes from 'prop-types';
import React from 'react';
import { noop } from 'underscore';

const ROW = 'row';
const COLUMN = 'column';

class SmartGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { 
      selectedRadioValue: props.selectedValue,
      focusedRadio: props.defaultFocusedRadio,
      selectRadio: (index, value) => () => {
        this.setState({
          selectedRadioValue: value,
          focusedRadio: index,
        });
      },
      focusRadioByIndex: index => () => this.setState({ focusedRadio: index }),
    };
  }

  render() {
    const {props} = this;
    
    return React.Children.map(props.children, (child, index) => {
      const isFocused = parseInt(this.state.focusedRadio) === index;

      const radioProps = {
        index,
        selectedValue: this.state.selectedRadioValue,
        onClick: this.state.selectRadio,
        onChange: props.onChange,
        onFocus: this.state.focusRadioByIndex(index),
        onBlur: this.state.focusRadioByIndex(null),
        focused: isFocused,
        name: props.name,
      };

      return React.cloneElement(child, radioProps);
    });
  }
}

SmartGroup.propTypes = {
};

const RadioGroup = props => {
  const { selectedValue, defaultFocusedRadio, groupLabel, name, direction, children, onChange, 'data-test': dataTest, 'data-trackingid': dataTracking } = props;
  const label = groupLabel ? <div>{groupLabel}</div> : null;
  return (
    <React.Fragment>
      {label}
      <div
        data-component="RadioGroup"
        data-test={dataTest}
        data-trackingid={dataTracking}
        role="radiogroup"
        name={name}
        style={{
          flexDirection: direction,
          display: "flex" }
        }>
        <SmartGroup
          onChange={onChange}
          name={name}
          selectedValue={selectedValue}
          defaultFocusedRadio={defaultFocusedRadio}>
          {children}
        </SmartGroup>
      </div>
    </React.Fragment>
  );
};

RadioGroup.propTypes = {
  /**
   * Collection of Radio instances
   */
  children: PropTypes.node,
  /**
   * Collection of Radio instances
   */
  direction: PropTypes.oneOf([ROW, COLUMN]),
  /**
   * Index of the focused radio before user interaction
   */
  defaultFocusedRadio: PropTypes.number,
  /**
   * Text displayed as label of group
   */
  groupLabel: PropTypes.string,
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
  /**
   * Value of selected radio 
   */
  selectedValue: PropTypes.string.isRequired,
};

RadioGroup.defaultProps = {
  defaultFocusedRadio: null,
  direction: ROW,
  groupLabel: null,
  handleSelection: noop,
  onChange: noop,
};

export { RadioGroup };
