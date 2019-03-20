import PropTypes from 'prop-types';
import React from 'react';
import virtualizedRenderer from 'react-syntax-highlighter-virtualized-renderer';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { StyleProvider, WithTheme } from '../StyleProvider';

const Code = ({ children, height, language }) => {
  return (
    <StyleProvider>
      <WithTheme>
        {theme => (
          <SyntaxHighlighter
            language={language || ''}
            style={theme.Code}
            customStyle={height ? { height } : null}
            renderer={height ? virtualizedRenderer() : null}
          >
            {children}
          </SyntaxHighlighter>
        )}
      </WithTheme>
    </StyleProvider>
  );
};
Code.propTypes = {
  children: PropTypes.string.isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  language: PropTypes.string,
};
Code.defaultProps = {
  height: null,
  language: null,
};
Code.themeDefinition = {};

export { Code };
