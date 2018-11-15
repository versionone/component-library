import PropTypes from 'prop-types';
import React from 'react';
import { applyStaticStyles } from '@versionone/components/StyleContainer';
import { PropsTable as Table } from 'docz';

const PropsTable = ({ of }) => (
  <div data-component="ThemeDefinitionTable">
    <Table
      of={{
        __docgenInfo: {
          props: Array.isArray(of)
            ? of[0].__docgenInfo.themeDefinition
            : of.__docgenInfo.themeDefinition,
        },
      }}
    />
  </div>
);
PropsTable.propTypes = {
  of: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.object,
  ]),
};
PropsTable.defaultProps = {
  of: {
    props: {},
  },
};
export default applyStaticStyles(
  {
    display: 'none',
  },
  '[data-component="ThemeDefinitionTable"] thead th:nth-of-type(3), [data-component="ThemeDefinitionTable"] tbody td:nth-of-type(3)',
)(PropsTable);
