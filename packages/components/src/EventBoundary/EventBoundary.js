import PropTypes from 'prop-types';
import { isFunction } from 'underscore';

const EventBoundary = ({ children, ...props }) => {
  const eventHandlers = Object.keys(props).filter(
    key => key.startsWith('on') && isFunction(props[key]),
  );
  const bind = eventHandlers.reduce(
    (acc, handlerName) => ({
      ...acc,
      [handlerName]: evt => {
        evt.stopPropagation();
        props[handlerName](evt);
      },
    }),
    {},
  );
  return children(bind);
};
EventBoundary.propTypes = {
  /** Render prop injecting event handler functions to bind to a child component. */
  children: PropTypes.func.isRequired,
};
export { EventBoundary };
