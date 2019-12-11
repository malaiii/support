import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './Table.css';
import moment from 'moment';
import { currencyFormatter, negativeCurrencyFormatter } from '../../utils/formattingUtils';
import ExportBtn from '../../../public/images/png/export-btn.png';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Date',
          field: 'calendar_date',
          cellStyle: { 'text-align': 'center' },
          cellClass: 'cell-border-style',
          valueFormatter: data => moment(data.value).format('L')
        },
        {
          headerName: 'Gross Sales',
          field: 'gross_sales',
          cellStyle: { color: '#588D92' },
          cellClass: 'number-cell',
          sortingOrder: ['desc', 'asc', 'none'],
          valueFormatter: currencyFormatter
        },
        {
          headerName: 'Lot Depletion',
          field: 'lot_depletion',
          cellStyle: { color: '#9b3748' },
          cellClass: 'number-cell',
          sortingOrder: ['asc', 'desc', 'none'],
          valueFormatter: negativeCurrencyFormatter
        },
        {
          headerName: 'Aged Off',
          field: 'aged_off',
          cellStyle: { color: '#e67c84' },
          cellClass: 'number-cell',
          sortingOrder: ['desc', 'asc', 'none'],
          valueFormatter: currencyFormatter
        },
        {
          headerName: 'Current Lot Balance',
          field: 'current_lot_balance',
          cellClass: 'number-cell',
          sortingOrder: ['desc', 'asc', 'none'],
          valueFormatter: currencyFormatter
        },
        {
          headerName: 'Commission Earned',
          field: 'commission_earned',
          cellClass: 'number-cell',
          sortingOrder: ['desc', 'asc', 'none'],
          valueFormatter: currencyFormatter
        }
      ],
      defaultColDef: { resizable: true, sortable: true },
      getRowStyle: params => {
        if (params.node.rowIndex % 2 === 0) {
          return { background: 'rgb(245, 245, 245)' };
        }
      },
      paramsObj: {}
    };
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.setState({ paramsObj: params });
    this.gridApi.refreshCells();
  };
  onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  exportData() {
    let paramsObj = this.props.data;
    paramsObj = {
      ...paramsObj,
      fileName: 'Table'
    };
    this.gridApi.exportDataAsCsv(paramsObj);
  }
  render() {
    const { data } = this.props;
    return (
      <div
        data-test="table-component"
        className="ag-theme-balham"
        style={{
          height: '450px',
          width: '100%-40',
          padding: '0px 40px 0px 40px'
        }}
      >
        <img
          data-test="export-btn"
          className="export-button-style"
          src={ExportBtn}
          onClick={() => this.exportData()}
        />
        <AgGridReact
          defaultColDef={this.state.defaultColDef}
          rowStyle={{ 'text-align': 'right' }}
          getRowStyle={this.state.getRowStyle}
          columnDefs={this.state.columnDefs}
          rowData={data}
          refreshView={true}
          animateRows={true}
          onGridReady={this.onGridReady}
          onFirstDataRendered={this.onFirstDataRendered.bind(this)}
        />
      </div>
    );
  }
}
export default Table;
