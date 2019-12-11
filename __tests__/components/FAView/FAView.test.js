import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
Enzyme.configure({ adapter: new EnzymeAdapter() })
import { findByAttr, setupDefault } from "../../../src/utils/test";
import FAView from "../../../src/components/FAView/FAView";
const selectedParams = {
    "data":
        { "firm": "Morgan Stanley Wealth Management", "gross_sales": 938874.87, "lot_depletion": -157799.83, "aged_off": -1586457.7, "current_lot_balance": 0, "commission_earned": 1583.14, "rr_num": 1112035 },
    "value": "Morgan Stanley Wealth Management"
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

describe("FAView Component", () => {
    const wrapper = setupShallow(FAView, { dive: true }, { selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup });
    test("FAView renders", () => {
        expect(wrapper.exists()).toBe(true);
    });
});
describe("FAView Component descriptions", () => {
    const wrapper = setupShallow(FAView, { dive: true }, { selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup });
    test("should render fa view description", () => {
        expect(findByAttr(wrapper, 'fa-view-description').length).toBe(1);
    });
    test("should render classes.greenKnockout description", () => {
        expect(wrapper.find('span').at(0).hasClass('test1')).toBeTruthy();
    });
    test("should render classes.greenKnockout description", () => {
        expect(wrapper.find('span').at(0).text()).toEqual('');
    });
    test("should render classes.company description", () => {
        expect(wrapper.find('span').at(1).hasClass('companyTest')).toBeTruthy();
    });
    test("should render classes.company description", () => {
        expect(wrapper.find('span').at(1).text()).toEqual('Morgan Stanley Wealth Management');
    });
    test("should render classes.container description", () => {
        expect(wrapper.find('div').at(2).hasClass('containerTest')).toBeTruthy();
    });
    test("should be rendered child RadioPanel component", () => {
        const faViewTable = findByAttr(wrapper, 'radio-panel-fa-component');
        expect(faViewTable.length).toBe(1);
    });
    test("should be rendered child Table component", () => {
        const faViewTable = findByAttr(wrapper, 'fa-view-table');
        expect(faViewTable.length).toBe(1);
    });
});
describe("FAView Component method test", () => {
    test("should be called onVoewChange method by passing fa", () => {
        const wrapper = setupShallow(FAView, { dive: true }, { onViewChange: jest.fn(), selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup, viewName: '' })
        wrapper.instance().onViewChange('fa')
        expect(wrapper.state().viewName).toEqual('fa')
    });
    test("should be called onVoewChange method by passing firm", () => {
        const wrapper = setupShallow(FAView, { dive: true }, { onViewChange: jest.fn(), selectedParams: selectedParams, classes: classes, data: data }, { detailRadioGroup: detailRadioGroup, viewName: '' })
        wrapper.instance().onViewChange('firm')
        expect(wrapper.state().viewName).toEqual('firm')
    });
});