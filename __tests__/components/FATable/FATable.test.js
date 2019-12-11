import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import FATable from "../../../src/components/FATable/FATable";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const data = [
    {
        "rm": "Marc Furgang",
        "code": "233",
        "rank": 1,
        "totalPoints": 12,
        "mrPoints": 4,
        "battingAvgPoints": 4,
        "diversificationPoints": 4,
        "tiebreakerSales": 667008602.7,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Patrick Layng",
        "code": "265",
        "rank": 2,
        "totalPoints": 12,
        "mrPoints": 4,
        "battingAvgPoints": 4,
        "diversificationPoints": 4,
        "tiebreakerSales": 331710404.2,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Bradley Eckstein",
        "code": "1321",
        "rank": 3,
        "totalPoints": 12,
        "mrPoints": 4,
        "battingAvgPoints": 4,
        "diversificationPoints": 4,
        "tiebreakerSales": 247933852.54,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Derek Cinquemani",
        "code": "2781",
        "rank": 15,
        "totalPoints": 10,
        "mrPoints": 2,
        "battingAvgPoints": 4,
        "diversificationPoints": 4,
        "tiebreakerSales": 81599742.67,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Timothy Hall",
        "code": "3536",
        "rank": 16,
        "totalPoints": 10,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 4,
        "tiebreakerSales": 78545946,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Jason Acab",
        "code": "112484",
        "rank": 17,
        "totalPoints": 9,
        "mrPoints": 4,
        "battingAvgPoints": 3,
        "diversificationPoints": 2,
        "tiebreakerSales": 125504907.04,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Jesse Walker",
        "code": "2586",
        "rank": 18,
        "totalPoints": 9,
        "mrPoints": 4,
        "battingAvgPoints": 2,
        "diversificationPoints": 3,
        "tiebreakerSales": 124479120.51,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Dominick McPeake",
        "code": "4165",
        "rank": 19,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 3,
        "tiebreakerSales": 116910079.58,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    }
]

const props = {
    data,
    selectedRMCode: 112484,
    collapsed: false,
    onCellClicked: jest.fn(),
}

const agGridParams = {
    api: {
        exportDataAsCsv: jest.fn(),
        sizeColumnsToFit: jest.fn(),
        onFilterChanged: jest.fn(),
        redrawRows: jest.fn(),
    },
    columnApi: {
    },
    node: {
        rowIndex: 2,
    },
    data: {
        "rm": "Jason Acab",
        "code": "112484",
        "rank": 17,
        "totalPoints": 9,
        "mrPoints": 4,
        "battingAvgPoints": 3,
        "diversificationPoints": 2,
        "tiebreakerSales": 125504907.04,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    }
}

describe("FATable component", () => {
    const wrapper = shallow(<FATable  {...props} />);
    wrapper.setState({ filter: "", paramsObj: {}, getRowStyle: jest.fn() });

    it("should be defined for with valid data", () => {
        expect(wrapper).toBeDefined();
    });

    it("should call onGridReady", async () => {
        expect(wrapper.instance().onGridReady(agGridParams)).toBeUndefined();
    })

    it("should call exportCsv", async () => {
        wrapper.setState({ paramsObj: {} });
        expect(wrapper.instance().exportCsv()).toBeUndefined();
    })

    it("should call onFirstDataRendered", async () => {
        expect(wrapper.instance().onFirstDataRendered(agGridParams)).toBeUndefined();
    })

    it("should call onCellClicked", async () => {
        expect(wrapper.instance().onCellClicked()).toBeUndefined();
    })

    it("should call isExternalFilterPresent", async () => {
        expect(wrapper.instance().isExternalFilterPresent()).toBe(false);
    })

    it("should call doesExternalFilterPass", async () => {
        const node = {
            data: {
                financial_advisor: ""
            }
        }
        expect(wrapper.instance().doesExternalFilterPass(node)).toBe(true);
    })

    it("should call externalFilterChanged", async () => {
        wrapper.setState({ filter: "" });
        const newValue = {
            financial_advisor: {
                code: 3536
            }
        }
        wrapper.setProps({ selectedRMCode: 3536, collapsed: true });
        expect(wrapper.instance().externalFilterChanged(newValue)).toBeUndefined();
    })

});