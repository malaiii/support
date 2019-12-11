import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new EnzymeAdapter() })
import FirmView from "../../../src/components/FirmView/FirmView";
import { findByAttr, setupDefault } from "../../../src/utils/test";
const selectedParams = {
    "data":
        { "firm": "Morgan Stanley Wealth Management", "gross_sales": 938874.87, "lot_depletion": -157799.83, "aged_off": -1586457.7, "current_lot_balance": 0, "commission_earned": 1583.14, "rr_num": 1112035 },
    "value": 1000
}
const detailRadioGroup = [
    { value: "fa", label: "All Financial Advisors" },
    { value: "firm", label: "All Firm" }
]
const classes = {
    "greenKnockout": "test1",
    "company": "companyTest",
    "container": "containerTest",
    "title": "titleTest"
}
const data = [];

const { setupShallow, setupMount } = setupDefault();

describe("FirmView Component", () => {
    const wrapper = setupShallow(FirmView, { dive: true }, { selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup });
    test("FirmView renders", () => {
        expect(wrapper.exists()).toBe(true);
    });
});
describe("FirmView Component descriptions", () => {
    const wrapper = setupShallow(FirmView, { dive: true }, { selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup });
    test("should render firm view description", () => {
        expect(findByAttr(wrapper, 'firm-view-description').length).toBe(1);
    });
    test("should render classes.greenKnockout description", () => {
        expect(wrapper.find('span').at(0).hasClass('test1')).toBeTruthy();
    });
    test("should render classes.greenKnockout description text", () => {
        expect(wrapper.find('span').at(0).text()).toEqual('Morgan Stanley Wealth Management');
    });
    test("should render classes.container description", () => {
        expect(wrapper.find('div').at(2).hasClass('containerTest')).toBeTruthy();
    });
    test("should be rendered child RadioPanel component", () => {
        const firmViewTable = findByAttr(wrapper, 'radio-panel-firm-component');
        expect(firmViewTable.length).toBe(1);
    });
    test("should be rendered child Table component", () => {
        const firmViewTable = findByAttr(wrapper, 'firm-view-table');
        expect(firmViewTable.length).toBe(1);
    });
});
describe("FirmView Component method test", () => {
    test("should be called onVoewChange method by passing fa", () => {
        const wrapper = setupShallow(FirmView, { dive: true }, { onViewChange: jest.fn(), selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup, viewName: '' })
        wrapper.instance().onViewChange('fa')
        expect(wrapper.state().viewName).toEqual('fa')
    });
    test("should be called onVoewChange method by passing firm", () => {
        const wrapper = setupShallow(FirmView, { dive: true }, { onViewChange: jest.fn(), selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup, viewName: '' })
        wrapper.instance().onViewChange('firm')
        expect(wrapper.state().viewName).toEqual('firm')
    });
});