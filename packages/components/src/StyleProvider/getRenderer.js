import createRenderer from './createRenderer';

let singletonRenderer;
export default ({ dev, renderer }) => {
  if (renderer) {
    return renderer;
  }
  if (!singletonRenderer) {
    singletonRenderer = createRenderer({ dev });
    singletonRenderer.rendererId = '@versionone/components';
  }
  return singletonRenderer;
};
