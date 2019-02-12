module.exports = {
  svgo: false,
  svgoCongig: './svgo.config.json',
  titleProp: true,
  template: ({ template }, opts, { imports, componentName, props, jsx }) => {
    return template.ast`${imports}
import withIconProps from './utils/withIconProps';
const ${componentName} = (${props}) => ${jsx}

export default withIconProps(${componentName})
`;
  },
};
