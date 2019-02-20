import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

const DOM_ID = 'REACT_PORTAL';

class PortalContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (document.getElementById(DOM_ID)) return;
    const portalContainer = document.createElement('div');
    portalContainer.setAttribute('id', DOM_ID);
    portalContainer.style.zIndex = 100000;
    document.body.appendChild(portalContainer);
  }

  render() {
    const { children, mounted } = this.props;

    return (
      mounted &&
      ReactDOM.createPortal(children, document.getElementById(DOM_ID))
    );
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
