import PropTypes from 'prop-types'
import React from 'react'
import { PipelineIcon } from '@versionone/icons'
import { createComponent } from '../StyleProvider'
import { Button } from '../Button'
import RowInstance from './RowInstance'

const TableImpl = createComponent(() => ({ width: '100%' }), 'div', [
  'data-test',
  'data-component',
]);

const ColumnHeader = createComponent(
  ({ colWidth }) => ({ fontWeight: 700, width: colWidth }),
  'span',
  ['title', 'onClick', 'key'],
);

const ButtonWrapper = createComponent(
  () => ({ margin: '0 auto', display: 'block', width: '110px'}),
  'span',
);

class Table extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.sort = this.sort.bind(this);
    this.state = {
      data: props.data,
      sortDirection: null,
      sortBy: null,
    };
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    const { data } = nextProps;
    const newData =
      data.length === prevState.data.length ? prevState.data : data;
    return { data: newData };
  }

  sort (key) {
    let sortBy = key;
    let sortDirection = this.state.sortDirection;
    let data = [...this.state.data];
    if (this.state.sortBy === key) {
      sortDirection = sortDirection === 'ASC' ? 'DESC' : '';
    } else {
      sortDirection = 'ASC';
    }
    if (sortDirection === 'ASC') {
      data.sort((a, b) => a[key].toString().localeCompare(b[key].toString()))
    } else if (sortDirection === 'DESC') {
      data = data
        .sort((a, b) => a[key].toString().localeCompare(b[key].toString()))
        .reverse();
    } else if (sortDirection === '') {
      sortBy = null;
      data = this.props.data;
    }
    this.setState({ data: data, sortBy: sortBy, sortDirection: sortDirection });
  }

  render () {
    const {
      columns,
      sortEnabled,
      paginationEnabled,
      paginationProps,
      rowInstance,
    } = this.props;
    const colWidth = `${100 / columns.length}%`;
    const { sortBy, sortDirection } = this.state;
    const sortIconRotate = sortDirection === 'ASC' ? 90 : 270;
    return (
      <TableImpl data-component='Table' data-test={this.props['data-test']}>
        <RowInstance key='header' isHeader={true}>
          {columns.map(column => {
            return (
              <ColumnHeader
                key={column.key}
                title={sortEnabled ? 'click to sort' : null}
                onClick={
                  sortEnabled
                    ? () => {
                        this.sort(column.key)
                      }
                    : null
                }
                colWidth={column.width ? column.width : colWidth}
              >
                {column.label}
                {sortEnabled && sortBy === column.key && sortDirection && (
                  <PipelineIcon
                    title={sortDirection}
                    size={16}
                    rotate={sortIconRotate}
                  />
                )}
              </ColumnHeader>
            )
          })}
        </RowInstance>
        {this.state.data.map(dataRow => {
          return rowInstance(dataRow)
        })}

        {paginationEnabled && paginationProps && paginationProps.more > 0 && (
          <ButtonWrapper>
            <Button
              type='primary'
              onClick={() => {
                paginationProps.fetchData()
              }}
            >
              Load More
            </Button>
          </ButtonWrapper>
        )}
      </TableImpl>
    )
  }
}

Table.propTypes = {
  /**
   * data-test attribute
   */
  'data-test': PropTypes.string,
  /**
   * Column Headers attribute
   */
  columns: PropTypes.arrayOf(PropTypes.shape({
    /**
     * Column Label to be displayed
     */
    label: PropTypes.string,
    /**
     * Key to access the specified column
     */
    key: PropTypes.string,
    /**
     * Width of header column in %
     */
    width: PropTypes.string
  })),
  /**
   * Strucure of rows to be displayed in table
   */
  rowInstance: PropTypes.func,
  /**
   * Data to be displayed in table
   */
  data: PropTypes.arrayOf(PropTypes.object),
  /**
   * Pagination enabled or not
   */
  paginationEnabled: PropTypes.bool,
  /**
   * Pagination properties - count, more, fetchData function
   */
  paginationProps: PropTypes.shape({
    /**
     * Total record count
     */
    count: PropTypes.number,
    /**
     * Remaining record count
     */
    more: PropTypes.number,
    /**
     * Function to fetch next set of data
     */
    fetchData: PropTypes.func,
  }),
  /**
   * Sort enabled or not
   */
  sortEnabled: PropTypes.bool,
};

Table.defaultProps = {
  columns: [],
  data: [],
  paginationEnabled: false,
  sortEnabled: false,
};

export { Table };
