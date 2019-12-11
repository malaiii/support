import React from 'react'
import Enzyme, {mount, shallow} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {
    setupDefault,
    findByAttr
} from '../../../src/utils/test/index';
import Table from "../../../src/components/Table/Table";
import {currencyFormatter, negativeCurrencyFormatter} from "../../../src/utils/formattingUtils";

Enzyme.configure({ adapter: new EnzymeAdapter() })

const data = [
    {"calendar_date": "2019-04-02","gross_sales":0.00,"lot_depletion":-199000.00,"aged_off":0.00,"current_lot_balance":2589160.00,"commission_earned":96.64},
    {"calendar_date": "2019-04-01","gross_sales":275494.00,"lot_depletion":-578471.89,"aged_off":0.00,"current_lot_balance":2290806.00,"commission_earned":81.16},
    {"calendar_date": "2019-04-03","gross_sales":0.00,"lot_depletion":-26975.00,"aged_off":0.00,"current_lot_balance":1340475.00,"commission_earned":49.83},
    {"calendar_date": "2019-04-04","gross_sales":358817.19,"lot_depletion":0.00,"aged_off":0.00,"current_lot_balance":1330110.57,"commission_earned":46.80},
    {"calendar_date": "2019-04-05","gross_sales":127590.00,"lot_depletion":-62000.00,"aged_off":0.00,"current_lot_balance":1274672.22,"commission_earned":44.78},
    {"calendar_date": "2019-04-07","gross_sales":1000000.00,"lot_depletion":0.00,"aged_off":0.00,"current_lot_balance":1565907.30,"commission_earned":43.02},
    {"calendar_date": "2019-04-06","gross_sales":0.00,"lot_depletion":0.00,"aged_off":0.00,"current_lot_balance":21.68,"commission_earned":0.00}
]
const state = {
    columnDefs: [
        { headerName: 'Date', field: 'calendar_date', cellStyle: { 'text-align': 'center' }, cellClass: 'cell-border-style', valueFormatter: (data) => moment(data.value).format('L') },
        { headerName: 'Gross Sales', field: 'gross_sales', cellStyle: { 'color': '#588D92' }, cellClass: 'number-cell', valueFormatter: currencyFormatter },
        { headerName: 'Lot Depletion', field: 'lot_depletion', cellStyle: { 'color': '#9b3748' }, cellClass: 'number-cell', valueFormatter: negativeCurrencyFormatter },
        { headerName: 'Aged Off', field: 'aged_off', cellStyle: { 'color': '#e67c84' }, cellClass: 'number-cell', valueFormatter: currencyFormatter },
        { headerName: 'Current Lot Balance', field: 'current_lot_balance', cellClass: 'number-cell', valueFormatter: currencyFormatter },
        { headerName: 'Commission Earned', field: 'commission_earned', cellClass: 'number-cell', valueFormatter: currencyFormatter }
    ],
    defaultColDef: { resizable: true },
    getRowStyle: (params) => {
        if (params.node.rowIndex % 2 === 0) {
            return { background: 'rgb(245, 245, 245)' };
        }
    },
    paramsObj: {}
}
const params = {
    "api": {refreshCells: jest.fn(), exportDataAsCsv: jest.fn(), getRowStyle: jest.fn(), sizeColumnsToFit: jest.fn()},
    "columnApi": {},
    "node": {rowIndex: 100}
}

const { setupShallow, setupMount, setupTheme } = setupDefault({data: data})

describe('Table ', () => {
    const wrapper = setupShallow(Table, {},{data: data, exportData: jest.fn(), onGridReady: jest.fn(), onFirstDataRendered: jest.fn()},
        {columnDefs: [
                { headerName: 'Date', field: 'calendar_date', cellStyle: { 'text-align': 'center' }, cellClass: 'cell-border-style', valueFormatter: (data) => moment(data.value).format('L') },
                { headerName: 'Gross Sales', field: 'gross_sales', cellStyle: { 'color': '#588D92' }, cellClass: 'number-cell', valueFormatter: currencyFormatter },
                { headerName: 'Lot Depletion', field: 'lot_depletion', cellStyle: { 'color': '#9b3748' }, cellClass: 'number-cell', valueFormatter: negativeCurrencyFormatter },
                { headerName: 'Aged Off', field: 'aged_off', cellStyle: { 'color': '#e67c84' }, cellClass: 'number-cell', valueFormatter: currencyFormatter },
                { headerName: 'Current Lot Balance', field: 'current_lot_balance', cellClass: 'number-cell', valueFormatter: currencyFormatter },
                { headerName: 'Commission Earned', field: 'commission_earned', cellClass: 'number-cell', valueFormatter: currencyFormatter }
            ],
            defaultColDef: { resizable: true },
            getRowStyle: (params) => {
                if (params.node.rowIndex % 2 === 0) {
                    return { background: 'rgb(245, 245, 245)' };
                }
            },
            paramsObj: {}});
    const instance = wrapper.instance();
    test('<Table /> renders component', () => {
        const tableComponent = findByAttr(wrapper, 'table-component')
        expect(tableComponent.length).toBe(1);
    })
    test('<Table /> renders component', () => {
        const exportButton = findByAttr(wrapper, 'export-btn')
        expect(exportButton.length).toBe(1);
    })
    test('component should have AGGridReact', () => {
        expect(wrapper.find("AgGridReact").exists()).toEqual(true)
    });
    test('component onGridReady method should be called', () => {
        instance.onGridReady(params);
        expect(wrapper.state('paramsObj')).toEqual(params);
    });
    test('component exportData method should be called', () => {
        const spy = jest.spyOn(instance, 'exportData');
        instance.exportData();
        expect(spy).toHaveBeenCalled();
    });
    test('component onFirstDataRendered method should be called', () => {
        const spy = jest.spyOn(instance, 'onFirstDataRendered');
        instance.onFirstDataRendered(params);
        expect(spy).toHaveBeenCalled();
    });
})
describe('Table mount test ', () => {
    const wrapper = mount(<Table data={data} />);
    test('<Table /> renders component by mount', () => {
        const tableComponent = findByAttr(wrapper, 'table-component')
        expect(tableComponent.length).toBe(1);
    })
})