import React from 'react';
import { createComponent } from '../../../packages/components/src/StyleProvider';
import { Tooltip } from '../../../packages/components/src/Tooltip';
import { SpacedGroup } from '../../../packages/components/src/SpacedGroup';
import { Switch } from '../../../packages/components/src/Switch';
import { CopyToClipboard } from '../../../packages/components/src/CopyToClipboard';
import { palette } from '../../../packages/components/src/palette';

const Swatch = createComponent(
  ({ color }) => ({
    width: 100,
    height: 100,
    cursor: 'pointer',
    'border-radius': 5,
    'background-color': color,
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'center',
    ':after': {
      content: '""',
      color,
      'mix-blend-mode': 'difference',
    },
  }),
  'div',
);

const ColorPalette = props => (
  <SpacedGroup>
    {Object.keys(palette).map(colorName => {
      const colorValue = palette[colorName];
      return (
        <Tooltip
          key={colorName}
          anchor={
            <CopyToClipboard
              text={colorName}
              onCopy={props.handleCopy(`Copied: ${colorName} (${colorValue})`)}
            >
              <Swatch color={colorValue}>
                {props.showNames && (
                  <SpacedGroup direction="vertical" xs={2} center>
                    <span>{colorValue}</span>
                    <span>{colorName}</span>
                  </SpacedGroup>
                )}
              </Swatch>
            </CopyToClipboard>
          }
        >
          <SpacedGroup xs={2}>
            <span>{colorName}</span>
          </SpacedGroup>
        </Tooltip>
      );
    })}
  </SpacedGroup>
);

class SmartColorPalette extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { on: true, message: null };
    this.toggle = this.toggle.bind(this);
    this.handleCopy = this.handleCopy.bind(this);
  }

  toggle() {
    this.setState(state => ({ on: !state.on }));
  }

  handleCopy(message) {
    return () => {
      this.setState({ message });
      setTimeout(() => {
        this.setState({ message: null });
      }, 2000);
    };
  }

  render() {
    const { on, message } = this.state;
    return (
      <SpacedGroup direction="vertical">
        <SpacedGroup center>
          <Switch onClick={this.toggle} checked={on} />
          {message && <span>{message}</span>}
        </SpacedGroup>
        <ColorPalette showNames={on} handleCopy={this.handleCopy} />
      </SpacedGroup>
    );
  }
}

export default SmartColorPalette;
