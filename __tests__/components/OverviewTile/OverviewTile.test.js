import Enzyme from "enzyme";
import { setupDefault } from "../../../src/utils/test";
import EnzymeAdapter from "enzyme-adapter-react-16";
import OverviewTile from "../../../src/components/OverviewTile/OverviewTile";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const data = {
  "GROSS_FLOWS_MONTHLY_EXISTING": {
    "loading": false,
    "messages": [],
    "data": [{
      "rm_name": "Jason, Acab",
      "calendar_date": "2019-04-01",
      "gross_sales": 392905.11,
      "lot_depletion": 0,
      "aged_off": 0,
      "current_lot_balance": 21976171.33,
      "commission_earned": 27.03
    },
    {
      "rm_name": "Jason, Acab",
      "calendar_date": "2019-04-02",
      "gross_sales": 218304.05,
      "lot_depletion": -486725,
      "aged_off": 0,
      "current_lot_balance": 21707750.38,
      "commission_earned": 26.7
    }]
  },
  "ADVISOR": {
    data: [{ "financial_advisor": "Geri, Michael", "rr_num": 373797, "firm": "RBC Capital Markets", "gross_sales": 7245374.17, "lot_depletion": -1112677.24, "aged_off": 0, "current_lot_balance": 17358539.96, "commission_earned": 770.41 }, { "financial_advisor": "Cox, Harsch, and Shook, Team of ", "rr_num": 1280763, "firm": "Morgan Stanley Wealth Management", "gross_sales": 7795377.63, "lot_depletion": 0, "aged_off": 0, "current_lot_balance": 7795377.63, "commission_earned": 412.01 }, { "financial_advisor": "Merriman/ Rogers, Scott/ Christopher", "rr_num": 10097585, "firm": "RBC Capital Markets", "gross_sales": 712515, "lot_depletion": -345522, "aged_off": 0, "current_lot_balance": 5232718.74, "commission_earned": 248.57 }]
  },
  "FIRM": {
    data: [{ "firm": "RBC Capital Markets", "client_id": "A6UJ9A0000HA", "gross_sales": 14235615.5, "lot_depletion": -2823316.45, "aged_off": 0, "current_lot_balance": 44744170.64, "commission_earned": 2020.41 }, { "firm": "Morgan Stanley Wealth Management", "client_id": "A6UJ9A0000G6", "gross_sales": 21309498.46, "lot_depletion": -3417274.24, "aged_off": 0, "current_lot_balance": 29896584.4, "commission_earned": 1378.78 }, { "firm": "Ameriprise Financial Services, Inc.", "client_id": "A6UJ9A0000D8", "gross_sales": 6498084.84, "lot_depletion": -835028.61, "aged_off": 0, "current_lot_balance": 24027416.25, "commission_earned": 1135.66 }]
  }
}

const theme = {
  palette: {
    gold: {
      "500": "#a39161",
    }
  }
}

const props = {
  theme,
  data,
}

const state = {
  viewName: "chart",
  radioGroup: [
    { value: "chart", label: "Chart" },
    { value: "table", label: "Table" }
  ]
}

const { setupShallow } = setupDefault();

describe("Overview tile", () => {
  const wrapper = setupShallow(OverviewTile, { dive: true }, props, state);

  it("should be defined for with valid data", () => {
    expect(wrapper).toBeDefined();
  });

  it("should be able to change the view", () => {
    wrapper.instance().onViewChange("table");
    expect(wrapper.state().viewName).toBe("table");
  });
});