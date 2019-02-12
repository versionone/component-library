/* eslint-disable-next-line import/no-extraneous-dependencies */
const startCase = require('lodash.startcase');

module.exports = {
  svgo: true,
  svgoCongig: './svgo.config.json',
  svgProps: {
    'aria-labeledby': 'title',
    role: 'img',
  },
  titleProp: true,
  template: (
    { template },
    opts,
    { imports, componentName, props, jsx },
  ) => template.ast`${imports}
import withIconProps from './utils/withIconProps';
const ${componentName} = (${props}) => ${jsx}
${componentName}.displayName = '${startCase(
    componentName.name.replace('Svg', ''),
  )}'

export default withIconProps(${componentName})
`,
};
