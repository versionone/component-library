module.exports = {
  svgo: true,
  svgoCongig: './svgo.config.json',
  svgProps: {
    'aria-labeledby': 'title',
    role: 'img',
  },
  titleProp: true,
  template: ({ template }, opts, { imports, componentName, props, jsx }) => {
    return template.ast`${imports}
import withIconProps from './utils/withIconProps';
const ${componentName} = (${props}) => ${jsx}

export default withIconProps(${componentName})
`;
  },
};
