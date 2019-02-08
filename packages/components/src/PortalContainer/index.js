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
    portalContainer.style.position = 'fixed';
    document.body.appendChild(portalContainer);
  }

  render() {
    return (
      this.props.mounted &&
      ReactDOM.createPortal(
        this.props.children,
        document.getElementById(DOM_ID),
      )
    );
  }
}
PortalContainer.propTypes = {
  mounted: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
PortalContainer.defaultProps = {
  mounted: false,
};
export { PortalContainer };
