import React, { PureComponent } from 'react';
import getComponentDisplayName from './getComponentDisplayName';
import WithRenderer from './WithRenderer';

const applyStaticStyles = (staticStyles, selector) => ComponentToWrap => {
  class CompWithStaticStyles extends PureComponent {
    componentDidMount() {
      this.renderer.renderStatic(staticStyles, selector);
    }

    render() {
      return (
        <WithRenderer>
          {renderer => {
            this.renderer = renderer;
            return <ComponentToWrap {...this.props} />;
          }}
        </WithRenderer>
      );
    }
  }

  CompWithStaticStyles.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    ...ComponentToWrap.propTypes,
  };
  CompWithStaticStyles.displayName = getComponentDisplayName(ComponentToWrap);

  return CompWithStaticStyles;
};

export default applyStaticStyles;
