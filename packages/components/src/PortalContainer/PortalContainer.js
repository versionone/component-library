import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const DOM_ID = 'REACT_PORTAL';

class PortalContainer extends React.Component {
  constructor() {
    super();
    if (typeof document === 'undefined') {
      return;
    }
    if (!document.getElementById(DOM_ID)) {
      const portalContainer = document.createElement('div');
      portalContainer.setAttribute('id', DOM_ID);
      portalContainer.style.zIndex = 4000;
      portalContainer.style.position = 'absolute';
      portalContainer.style.left = 0;
      portalContainer.style.top = 0;
      document.body.appendChild(portalContainer);
    }
    this.el = document.getElementById(DOM_ID);
  }

  render() {
    const { children, mounted } = this.props;

    if (!this.el) {
      return null;
    }
    return mounted && ReactDOM.createPortal(children, this.el);
  }
}

PortalContainer.propTypes = {
  children: PropTypes.node.isRequired,
  mounted: PropTypes.bool,
};
PortalContainer.defaultProps = {
  mounted: false,
};

export { PortalContainer };
