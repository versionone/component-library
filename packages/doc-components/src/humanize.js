import capitalize from 'capitalize';

const RE_OBJECTOF = /(?:React\.)?(?:PropTypes\.)?objectOf\((?:React\.)?(?:PropTypes\.)?(\w+)\)/;

const getTypeStr = type => {
  let shape;
  let rst;
  switch (type.name.toLowerCase()) {
    case 'instanceof':
      return `Class(${type.value})`;
    case 'enum':
      if (type.computed) return type.value;
      return type.value
        ? type.value.map(v => `${v.value}`).join(' │ ')
        : type.raw;
    case 'union':
      return type.value
        ? type.value.map(t => `${getTypeStr(t)}`).join(' │ ')
        : type.raw;
    case 'array':
      return type.raw;
    case 'arrayof':
      return `Array<${getTypeStr(type.value)}>`;
    case 'custom':
      if (type.raw.indexOf('function') !== -1 || type.raw.indexOf('=>') !== -1)
        return 'Custom(Function)';
      if (type.raw.toLowerCase().indexOf('objectof') !== -1) {
        const m = type.raw.match(RE_OBJECTOF);
        if (m && m[1]) return `ObjectOf(${capitalize(m[1])})`;
        return 'ObjectOf';
      }
      return 'Custom';
    case 'bool':
      return 'Boolean';
    case 'func':
      return 'Function';
    case 'shape':
      shape = type.value;
      rst = {};

      Object.keys(shape).forEach(key => {
        rst[key] = getTypeStr(shape[key]);
      });

      return JSON.stringify(rst, null, 2);
    default:
      return capitalize(type.name);
  }
};

export default type => getTypeStr(type);
