const { createElement } = require('react');
const { renderToString } = require('react-dom/server');
const { getRenderer } = require('@versionone/components');
const { renderToMarkup } = require('fela-dom');

const hydrationExp = /data-fela-rehydration="\d+"/;
const hydrationReplacementExp = /(data-fela-rehydration=)|(")*/g;
const replaceStyleTagExp = /(<\/style>$)|(^<style[a-zA-z"/ =-\d@]*>)/g;

module.exports.replaceRenderer = ({
  bodyComponent,
  replaceBodyHTMLString,
  setHeadComponents,
}) => {
  const renderer = getRenderer({});
  const bodyHTML = renderToString(bodyComponent);
  const styleMarkup = renderToMarkup(renderer);
  replaceBodyHTMLString(bodyHTML);
  const hydrationString = hydrationExp.exec(styleMarkup);
  const hydrationId = hydrationString[0].replace(hydrationReplacementExp, '');
  const styles = styleMarkup.replace(replaceStyleTagExp, '');
  const Styles = createElement('style', {
    type: 'text/css',
    'data-fela-type': 'RULE',
    'data-fela-id': '@versionone/components',
    'data-fela-rehydration': hydrationId,
    dangerouslySetInnerHTML: { __html: styles },
  });
  setHeadComponents([Styles]);
};
