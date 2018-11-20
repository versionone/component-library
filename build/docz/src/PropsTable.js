import capitalize from 'capitalize';
import PropTypes from 'prop-types';
import React from 'react';
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
import { createComponent } from '@versionone/style-container';
import humanize from './humanize';

const getPropType = (prop, Tooltip) => {
  const propName = prop.type.name;
  const isEnum = propName.startsWith('"') || propName === 'enum';
  const name = capitalize(isEnum ? 'enum' : propName);
  const value = prop.type && prop.type.value;

  if (!name) return null;

  if (
    !Tooltip ||
    (isEnum && typeof value === 'string') ||
    (!prop.flowType && !isEnum && !value) ||
    (prop.flowType && !prop.flowType.elements)
  ) {
    return name;
  }

  return <Tooltip text={humanize(prop.type)}>{name}</Tooltip>;
};

const Th = createComponent(
  () => ({
    textAlign: 'left',
  }),
  'th',
);
const Tr = createComponent(
  ({ deprecated }) => ({
    backgroundColor: deprecated ? 'pink' : 'transparent',
  }),
  'tr',
);
const Strong = createComponent(
  () => ({
    fontWeight: 600,
  }),
  'strong',
);

const PropsTable = ({ of, components }) => {
  if (!of.__docgenInfo || !of.__docgenInfo.props) {
    return null;
  }
  const Table = components.table || 'table';
  const Thead = components.thead || 'thead';
  const Tbody = components.tbody || 'tbody';
  const Td = components.td || 'td';
  const Tooltip = components.tooltip;

  const propDefinitions = Object.keys(of.__docgenInfo.props).map(key => [
    key,
    of.__docgenInfo.props[key],
  ]);

  return (
    <div data-component="PropsTable">
      <Table>
        <Thead>
          <Tr>
            <Th>Property</Th>
            <Th>Type</Th>
            <Th>Required</Th>
            <Th>Default</Th>
            <Th width="40%">Description</Th>
          </Tr>
        </Thead>
        <Tbody>
          {propDefinitions.map(([key, value]) => (
            <Tr key={key} deprecated={value.deprecated}>
              <Td>{key}</Td>
              <Td>{getPropType(value, Tooltip)}</Td>
              <Td>{value.required ? 'true' : 'false'}</Td>
              <Td>
                {value.defaultValue ? (
                  value.defaultValue.value === "''" ? (
                    <em>[Empty String]</em>
                  ) : (
                    value.defaultValue &&
                    value.defaultValue.value.replace(/\'/g, '')
                  )
                ) : (
                  '[No Default]'
                )}
              </Td>
              <Td>
                {value.deprecated ? (
                  <span>
                    <Strong>@deprecated</Strong> {value.description}
                  </span>
                ) : (
                  <span>{value.description}</span>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};
PropsTable.propTypes = {
  of: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
  // eslint-disable-next-line react/forbid-prop-types
  components: PropTypes.object,
};
PropsTable.defaultProps = {
  of: {
    props: {},
  },
};

export default withMDXComponents(PropsTable);
