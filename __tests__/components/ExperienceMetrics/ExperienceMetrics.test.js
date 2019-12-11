import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { setupDefault } from "../../../src/utils/test";
import ExperienceMetrics from "../../../src/components/ExperienceMetrics/ExperienceMetrics";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const metricsData = [
    {
      "asOfDate": "2019-12-02",
      "ac": "John Gutowski",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 12,
      "retentionPoints": 4,
      "crossSellPoints": 4,
      "divQuartilePoints": 4,
      "averageSales": 175399147.13,
      "overallRank": 1,
      "createdDatetime": "2019-12-01T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Tanner Landstra",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 12,
      "retentionPoints": 4,
      "crossSellPoints": 4,
      "divQuartilePoints": 4,
      "averageSales": 79009784.65,
      "overallRank": 2,
      "createdDatetime": "2019-12-02T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Katherine Fayen",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 11,
      "retentionPoints": 4,
      "crossSellPoints": 3,
      "divQuartilePoints": 4,
      "averageSales": 54624180.19,
      "overallRank": 3,
      "createdDatetime": "2019-12-03T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Kevin Davis",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 11,
      "retentionPoints": 3,
      "crossSellPoints": 4,
      "divQuartilePoints": 4,
      "averageSales": 48657842.59,
      "overallRank": 4,
      "createdDatetime": "2019-12-04T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Michael Strizak",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 11,
      "retentionPoints": 4,
      "crossSellPoints": 4,
      "divQuartilePoints": 3,
      "averageSales": 40379745.44,
      "overallRank": 5,
      "createdDatetime": "2019-12-05T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Franki Priore",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 10,
      "retentionPoints": 2,
      "crossSellPoints": 4,
      "divQuartilePoints": 4,
      "averageSales": 106940652.96,
      "overallRank": 6,
      "createdDatetime": "2019-12-06T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Von Walker",
      "quarter": "Q1",
      "quartile": 1,
      "totalPoints": 10,
      "retentionPoints": 3,
      "crossSellPoints": 3,
      "divQuartilePoints": 4,
      "averageSales": 49826886,
      "overallRank": 7,
      "createdDatetime": "2019-12-07T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Christopher Ferro",
      "quarter": "Q1",
      "quartile": 2,
      "totalPoints": 9,
      "retentionPoints": 2,
      "crossSellPoints": 4,
      "divQuartilePoints": 3,
      "averageSales": 45131485.62,
      "overallRank": 8,
      "createdDatetime": "2019-12-08T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Jennifer Hayes",
      "quarter": "Q1",
      "quartile": 2,
      "totalPoints": 9,
      "retentionPoints": 3,
      "crossSellPoints": 3,
      "divQuartilePoints": 3,
      "averageSales": 43363012.66,
      "overallRank": 9,
      "createdDatetime": "2019-12-09T20:33:00.000-0500"
    },
    {
      "asOfDate": "2019-12-02",
      "ac": "Charlotte Noels",
      "quarter": "Q1",
      "quartile": 2,
      "totalPoints": 9,
      "retentionPoints": 4,
      "crossSellPoints": 2,
      "divQuartilePoints": 3,
      "averageSales": 42805072.72,
      "overallRank": 10,
      "createdDatetime": "2019-12-10T20:33:00.000-0500"
    }
  ]

const props = {
    metricsData,
    selectedRM: 112484,
}

const { setupShallow } = setupDefault();

describe("Experience metrics tile", () => {
    const wrapper = setupShallow(ExperienceMetrics, { dive: true }, props);

    it("should be defined for with valid data", () => {
        expect(wrapper).toBeDefined();
    });

    it("should not render summary section when there is no data", async () => {
        wrapper.setProps({ metricsData: [] });
        expect(wrapper.instance().props.summary).toBeFalsy();
    })

});