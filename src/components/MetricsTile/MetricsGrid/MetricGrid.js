import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import './MetricGrid.css';
import { currencyFormatter } from '../../../utils/formattingUtils';
import * as metricsHeaders from './MetricsGridHeaders';

class MetricGrid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: { sortable: true },
      filter: '',
      paramsObj: {}
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.setState({ paramsObj: params });
    this.gridColumnApi = params.columnApi;
  };

  getRowStyle = params => {
    let selectedRMCode = this.props.selectedRMCode;
    if (params.data.code == selectedRMCode) {
      return { background: '#FFFF66' };
    } else if (params.node.rowIndex % 2 === 0) {
      return { background: 'rgb(245, 245, 245)' };
    }
  };

  exportCsv = () => {
    let paramsObj = this.state.paramsObj;
    paramsObj.fileName = 'IncentiveMetricsSummary';
    this.gridApi.exportDataAsCsv(paramsObj);
  };

  onFirstDataRendered = params => {
    params.api.sizeColumnsToFit();
  };

  componentDidUpdate(prevProps, prevState) {

    if (prevState.filter != this.state.filter) {
      this.gridApi.onFilterChanged();
    }
    if (prevProps.selectedRMCode != this.props.selectedRMCode || prevProps.collapsed != this.props.collapsed) {
      this.gridApi.redrawRows();
      this.gridApi.sizeColumnsToFit();
    }
  }


  render() {
    const { data, collapsed, tileId, selectedRMCode } = this.props;
    return (
      <div
        data-test="component-fa-table"
        className="ag-theme-balham"
        style={collapsed ? {
          height: '320px',
          width: '600',
          padding: '0px'
        } :
          {
            height: '450px',
            width: 'calc(100%-40px)',
            padding: '0px 40px'
          }
        }
      >
        <AgGridReact
          defaultColDef={this.state.defaultColDef}
          rowStyle={{ 'text-align': 'right' }}
          getRowStyle={selectedRMCode > 0 && this.getRowStyle}
          columnDefs={this.props.collapsed ? metricsHeaders[tileId].COLLAPSED : metricsHeaders[tileId].EXPANDED}
          rowData={data}
          onGridReady={this.onGridReady}
          onFirstDataRendered={this.onFirstDataRendered}
          animateRows={true}
          accentedSort={true}
        />
      </div>
    );
  }
}

export default MetricGrid;