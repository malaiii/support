import React from 'react'
import Enzyme from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import {
    setupDefault,
    findByAttr,
    storeFactory

} from '../../../src/utils/test/index';
import FATile from '../../../src/components/FATile/FATile'
import * as advisorData from '../../../public/data/advisor'
import { theme } from '../../../src/assets/Jss/withRoot'
import { mount, shallow } from 'enzyme';

Enzyme.configure({ adapter: new EnzymeAdapter() })


const state = {
    isFADrillSelected: false,
    FADrillData: null,
    FirmDrillData: null,
    detailsType: "fa",
    faRadioGroup: [
        { value: "byfa", label: "By Financial Advisor" },
        { value: "byfirm", label: "By Firm" }
    ],
    detailId: "",
    view: 'byfa',
    childView: '',
    faDescription: "COMMISSION DETAILS BY FINANCIAL ADVISOR - ",
    firmDescription: "COMMISSION DETAILS BY FIRM - ",

}
const classes = {
    "greenKnockout": "test1",
    "company": "companyTest",
    "radioSearchContainer": "radioSearchContainerTest",
    "title": "titleTest"
}

const { setupShallow, setupMount } = setupDefault();

const setupForMount = (state = {}) => {
    const store = storeFactory(state);
    const wrapper = mount(<FATile advisorData={advisorData} store={store} classes={classes} />)
    return wrapper;
}

describe('FA Tile ', () => {
    let wrapper
    beforeEach(() => {
        wrapper = setupForMount();
    })
    test('<FATile /> renders without render', () => {
        const faTileComponent = findByAttr(wrapper, 'component-fa-tile')
        expect(faTileComponent.length).toBe(1);
    })
})
describe("FATile Component descriptions", () => {
    const wrapper = setupForMount();
    test("should render firm view description", () => {
        expect(findByAttr(wrapper, 'component-fatile-description').length).toBe(1);
    });
    test("should render classes.greenKnockout description", () => {
        expect(wrapper.find('span').at(0).hasClass('test1')).toBeTruthy();
    });
    test("should render classes.radioSearchContainer description", () => {
        expect(wrapper.find('div').at(2).hasClass('radioSearchContainerTest')).toBeTruthy();
    });
    test("should render classes.titleTest description", () => {
        expect(wrapper.find('Typography').at(0).hasClass('titleTest')).toBeTruthy();
    });
});