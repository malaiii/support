import Enzyme from "enzyme";
import { setupDefault } from "../../../src/utils/test";
import EnzymeAdapter from "enzyme-adapter-react-16";
import KPITile from "../../../src/components/KPITile/KPITile";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const kpis = [
    {
        name: "GROSS SALES",
        label: "GROSS SALES",
        subLabel: "Sale",
        value: "1000",
    },
    {
        name: "LOT DEPLETION",
        label: "LOT DEPLETION",
        subLabel: undefined,
        value: "1000",
    }
]

const props = {
    data: {
        kpis
    },
    hideBorder: false,
}

const { setupShallow } = setupDefault();

describe("KPI tile", () => {
    const wrapper = setupShallow(KPITile, { dive: true }, props);

    it("should be defined for with valid data", () => {
        expect(wrapper).toBeDefined();
    });

    it("should be defined for hidden border too", () => {
        wrapper.setProps({ hideBorder: true });
        expect(wrapper).toBeDefined();
    });
});