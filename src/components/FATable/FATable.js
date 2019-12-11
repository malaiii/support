import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './FATable.css';
import { currencyFormatter, negativeCurrencyFormatter } from '../../utils/formattingUtils';

class FATable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: 'Financial Advisor',
          field: 'financial_advisor',
          cellStyle: { 'text-align': 'center', 'text-decoration': 'underline' },
          cellClass: 'cell-wrap-text',
          autoHeight: true
        },
        {
          headerName: 'Firm',
          field: 'firm',
          cellStyle: { 'text-align': 'center' },
          cellClass: 'cell-border-style',
          suppressCellSelection: true
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
      filter: '',
      paramsObj: {}
    };
    this.externalFilterChanged = this.externalFilterChanged.bind(this);
    this.exportCsv = this.exportCsv.bind(this);
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.setState({ paramsObj: params });
    this.gridColumnApi = params.columnApi;
  };

  exportCsv = () => {
    let paramsObj = this.state.paramsObj;
    paramsObj.fileName = 'ByFinancialAdvisorTable';
    this.gridApi.exportDataAsCsv(paramsObj);
  };

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };
  onCellClicked = params => {
    this.props.onCellClicked(params, 'fa');
  };
  isExternalFilterPresent = () => {
    // if ageType is not everyone, then we are filtering
    return this.state.filter !== '';
  };

  doesExternalFilterPass = node => {
    return node.data.financial_advisor === this.state.filter;
  };
  externalFilterChanged(newValue) {
    this.setState({ filter: newValue.financial_advisor });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter != this.state.filter) {
      this.gridApi.onFilterChanged();
    }
  }

  render() {
    const { data } = this.props;

    return (
      <div
        data-test="component-fa-table"
        className="ag-theme-balham"
        style={{
          height: '450px',
          width: '100%-40',
          padding: '0px 40px 0px 40px'
        }}
      >
        <AgGridReact
          defaultColDef={this.state.defaultColDef}
          rowStyle={{ 'text-align': 'right' }}
          getRowStyle={this.state.getRowStyle}
          columnDefs={this.state.columnDefs}
          rowData={data}
          onGridReady={this.onGridReady}
          onFirstDataRendered={this.onFirstDataRendered}
          onCellClicked={this.onCellClicked}
          animateRows={true}
          isExternalFilterPresent={this.isExternalFilterPresent}
          doesExternalFilterPass={this.doesExternalFilterPass}
          accentedSort={true}
        />
      </div>
    );
  }
}

export default FATable;
