import React from "react";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { setupDefault } from "../../../src/utils/test";
import DateRangePickerWrapper from "../../../src/components/DateRangePickerWrapper/DateRangePickerWrapper";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const props = {
    startDate: "2019-10-01T04:00:00.000Z",
    endDate: "2019-11-25T05:00:00.000Z",
    onDateSelect: jest.fn(),
}

const { setupShallow } = setupDefault();

describe("Date range picker wrapper", () => {
    const wrapper = setupShallow(DateRangePickerWrapper, { dive: true }, props, { focusedInput: true });
    const instance = wrapper.instance();

    it("should be defined", () => {
        expect(wrapper).toBeDefined();
    });

    it("should handle the date change", () => {
        instance.onDatesChange({ startDate: "2019-11-04T17:00:00.000Z", endDate: "2020-11-04T17:00:00.000Z" });
    });

    it("should focus the start date", () => {
        instance.onFocusChange("startDate");
        expect(wrapper.state().focusedInput).toBe("startDate");
    });

    it("should focus the end date", () => {
        instance.onFocusChange("endDate");
        expect(wrapper.state().focusedInput).toBe("endDate");
    });
});