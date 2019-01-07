
import React, { Component } from 'react';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableBody,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.scss';

class TableElement extends Component {
  renderColumns() {
    const { columns } = this.props;

    return (
      <TableRow>
        {Object.keys(columns).map(item => <TableHeaderCell key={item}>{item}</TableHeaderCell>)}
      </TableRow>
    );
  }

  renderData() {
    const {
      data, columns, onClick, className, tdClassName,
    } = this.props;

    return data.map(el => (
      <TableRow className={className} onClick={() => onClick(el.id)} key={el.id}>
        {Object.values(columns).map(column => (
          <TableCell key={column} className={classNames([style.td, tdClassName])}>
            {el[column]}
          </TableCell>
        ))}
      </TableRow>
    ));
  }

  renderTable() {
    const { fixed, selectable } = this.props;

    return (
      <Table selectable={selectable} fixed={fixed} structured basic="very" data-cy="app_list_table">
        <TableHeader>{this.renderColumns()}</TableHeader>
        <TableBody>{this.renderData()}</TableBody>
      </Table>
    );
  }

  render() {
    const { data } = this.props;
    return data.length === 0 ? <div className={style.err}>No entries</div> : this.renderTable();
  }
}

TableElement.defaultProps = {
  data: [],
  columns: {},
  fixed: false,
  onClick: () => {},
  selectable: false,
  className: null,
  tdClassName: null,
};

TableElement.propTypes = {
  columns: PropTypes.shape({}),
  data: PropTypes.arrayOf(PropTypes.shape({})),
  fixed: PropTypes.bool,
  onClick: PropTypes.func,
  selectable: PropTypes.bool,
  className: PropTypes.string,
  tdClassName: PropTypes.string,
};

export default TableElement;
