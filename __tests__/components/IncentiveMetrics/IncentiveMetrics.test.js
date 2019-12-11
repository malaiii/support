import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { setupDefault } from "../../../src/utils/test";
import IncentiveMetrics from "../../../src/components/IncentiveMetrics/IncentiveMetrics";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const metricsData = [
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
    },
    {
        "rm": "Chad Latour",
        "code": "3741",
        "rank": 20,
        "totalPoints": 9,
        "mrPoints": 2,
        "battingAvgPoints": 4,
        "diversificationPoints": 3,
        "tiebreakerSales": 113764059.26,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Sean German",
        "code": "3640",
        "rank": 21,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 3,
        "tiebreakerSales": 108626318.71,
        "overallIncentiveTier": 1,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Neil Sutton",
        "code": "941",
        "rank": 22,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 3,
        "tiebreakerSales": 106124095.36,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Zachary Schleimer",
        "code": "3491",
        "rank": 23,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 2,
        "diversificationPoints": 4,
        "tiebreakerSales": 98698420.11,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Jake Tripucka",
        "code": "4013",
        "rank": 24,
        "totalPoints": 9,
        "mrPoints": 4,
        "battingAvgPoints": 3,
        "diversificationPoints": 2,
        "tiebreakerSales": 95135458.89,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "James Casler",
        "code": "3981",
        "rank": 25,
        "totalPoints": 9,
        "mrPoints": 2,
        "battingAvgPoints": 4,
        "diversificationPoints": 3,
        "tiebreakerSales": 91050707.03,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Dain Reeves",
        "code": "189",
        "rank": 26,
        "totalPoints": 9,
        "mrPoints": 2,
        "battingAvgPoints": 4,
        "diversificationPoints": 3,
        "tiebreakerSales": 87915336.06,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Joe Dwyer",
        "code": "872",
        "rank": 27,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 3,
        "tiebreakerSales": 77405683.55,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Paul Salierno",
        "code": "3490",
        "rank": 28,
        "totalPoints": 9,
        "mrPoints": 3,
        "battingAvgPoints": 3,
        "diversificationPoints": 3,
        "tiebreakerSales": 71313763.16,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Jeffrey Weber",
        "code": "112279",
        "rank": 29,
        "totalPoints": 9,
        "mrPoints": 2,
        "battingAvgPoints": 4,
        "diversificationPoints": 3,
        "tiebreakerSales": 54857838.2,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Matt Bergen",
        "code": "3684",
        "rank": 30,
        "totalPoints": 8,
        "mrPoints": 3,
        "battingAvgPoints": 2,
        "diversificationPoints": 3,
        "tiebreakerSales": 109241665.61,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Ryan DiGaetano",
        "code": "2045",
        "rank": 31,
        "totalPoints": 8,
        "mrPoints": 3,
        "battingAvgPoints": 1,
        "diversificationPoints": 4,
        "tiebreakerSales": 74286952.96,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Adam Lowe",
        "code": "3167",
        "rank": 32,
        "totalPoints": 7,
        "mrPoints": 1,
        "battingAvgPoints": 2,
        "diversificationPoints": 4,
        "tiebreakerSales": 86605776.63,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    },
    {
        "rm": "Kevin Bosco",
        "code": "870",
        "rank": 33,
        "totalPoints": 7,
        "mrPoints": 4,
        "battingAvgPoints": 1,
        "diversificationPoints": 2,
        "tiebreakerSales": 70367631.95,
        "overallIncentiveTier": 2,
        "runningQuarter": "Q1",
        "lastRefresh": "2019-11-21T07:04:01.988-0500"
    }
]

const props = {
    metricsData,
    selectedRM: 112484,
}

const { setupShallow } = setupDefault();

describe("Incentive metrics tile", () => {
    const wrapper = setupShallow(IncentiveMetrics, { dive: true }, props);

    it("should be defined for with valid data", () => {
        expect(wrapper).toBeDefined();
    });

    it("should not render summary section when there is no data", async () => {
        wrapper.setProps({ metricsData: [] });
        expect(wrapper.instance().props.summary).toBeFalsy();
    })

    it("should move array element for RM not in the list", async () => {
        expect(wrapper.instance().moveArrayElements(metricsData, 9999)).toBe(0);
    })

    it("should move array element for RM before third position in the list", async () => {
        expect(wrapper.instance().moveArrayElements(metricsData, 265)).toBe(1);
    })

    it("should move array element for RM found after third position in the list", async () => {
        expect(wrapper.instance().moveArrayElements(metricsData, 2586)).toBe(3);
    })

    it("should move array element for RM found after top 10 in the list", async () => {
        expect(wrapper.instance().moveArrayElements(metricsData, 3167)).toBe(12);
    })

});