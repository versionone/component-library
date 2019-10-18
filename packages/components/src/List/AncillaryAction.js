import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import { noop } from 'underscore';
import { EventBoundary } from '../EventBoundary';
import { HoverIntersectionExclude } from '../HoverIntersection';

export const AncillaryAction = ({ children }) => (
  <EventBoundary onClick={noop} onFocus={noop} onKeyDown={noop}>
    {({ onClick, onFocus, onKeyDown }) => (
      <HoverIntersectionExclude>
        {({ bind, hovered }) => (
          <div
            {...bind}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
          >
            {cloneElement(children, { hovered })}
          </div>
        )}
      </HoverIntersectionExclude>
    )}
  </EventBoundary>
);

AncillaryAction.propTypes = {
  /**
   * Action to wrap with event boundary
   */
  children: PropTypes.node,
};
