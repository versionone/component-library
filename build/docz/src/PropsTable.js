import capitalize from 'capitalize';
import PropTypes from 'prop-types';
import React from 'react';
import StyleProvider from '@versionone/components/StyleProvider';
import { createComponent } from '@versionone/components/StyleContainer';
import { withMDXComponents } from '@mdx-js/tag/dist/mdx-provider';
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

const PropsTable = ({ of, components }) => {
  if (!of.__docgenInfo || !of.__docgenInfo.props) {
    return null;
  }
  const Tr = createComponent(
    ({ deprecated }) => ({
      background: deprecated ? 'pink' : 'transparent',
    }),
    components.tr || 'tr',
  );

  const Table = components.table || 'table';
  const Thead = components.thead || 'thead';
  const Tbody = components.tbody || 'tbody';
  const Th = components.th || 'th';
  const Td = components.td || 'td';
  // const Tr = components.tr || 'tr';
  const Tooltip = components.tooltip;

  const propDefinitions = Object.keys(of.__docgenInfo.props).map(key => [
    key,
    of.__docgenInfo.props[key],
  ]);

  return (
    <StyleProvider>
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
            {propDefinitions.map(([key, value]) => {
              let defaultValue = '[No Default]';
              if (value.defaultValue) {
                if (value.defaultValue.value === "''") {
                  defaultValue = '[Empty String]';
                } else {
                  defaultValue = value.defaultValue.value.replace(/('|")/g, '');
                }
              }
              return (
                <Tr key={key} deprecated={value.deprecated}>
                  <Td>{key}</Td>
                  <Td>{getPropType(value, Tooltip)}</Td>
                  <Td>{value.required ? 'true' : 'false'}</Td>
                  <Td>{defaultValue}</Td>
                  <Td>
                    {value.deprecated ? (
                      <span>
                        <strong>@deprecated</strong> {value.description}
                      </span>
                    ) : (
                      <span>{value.description}</span>
                    )}
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </div>
    </StyleProvider>
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
