import React from "react";
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import { setupDefault } from "../../../src/utils/test";
import ExpansionTile from "../../../src/components/ExpansionTile/ExpansionTile";

Enzyme.configure({ adapter: new EnzymeAdapter() });

const classes = {
    paper: {
        padding: "20px"
    },
    headerWrapper: {
        display: "flex",
        padding: "0 0 16px"
    },
    header: {
        width: "calc(100% - 24px)",
        textAlign: "left"
    },
    expansionIconWrapper: {
        width: "24px"
    },
    expansionIcon: {
        cursor: "pointer"
    },
    modal: {
        margin: "64px 24px",
        height: "calc(100vh - 88px)",
        background: "#fff",
        maxHeight: "100vh",
        overflow: "hidden",
        overflowY: "scroll",
    }
}

const props = {
    classes,
    collapsedTileTitle: "Collapsed title",
    collaspedHeader: <div>Collapsed header</div>,
    expandedHeader: <div>Expanded header</div>,
    summary: <div>Summary</div>,
    details: <div>Details </div>,
    tileId: "expansionTest",
    onExpansionTileToggle: jest.fn(),
    onTileExpand: jest.fn(),
    onTileCollapse: jest.fn(),
}

const { setupShallow } = setupDefault();

describe("Expansion Tile Component", () => {
    const wrapper = setupShallow(ExpansionTile, { dive: true }, props, { isExpanded: false });
    const instance = wrapper.instance();

    it("should be defined for collapsed state", () => {
        expect(wrapper).toBeDefined();
    });

    it("should be defined for expanded state", () => {
        wrapper.setState({ isExpanded: true });
        wrapper.setProps({ expandedTileId: "expansionTest" });
        expect(wrapper).toBeDefined();
    });

    it("should be null when other tile is expanded", () => {
        wrapper.setState({ isExpanded: true });
        wrapper.setProps({ expandedTileId: "otherTile" });
        expect(wrapper.props().children).toBeNull();
    });

    it("should toggle the expansion state to false", () => {
        wrapper.setState({ isExpanded: true });
        instance.toggleTitleHandler();
        expect(wrapper.state().isExpanded).toBe(false);
    });

    it("should toggle the expansion state to true", () => {
        wrapper.setState({ isExpanded: false });
        instance.toggleTitleHandler();
        expect(wrapper.state().isExpanded).toBe(true);
    });

    it("should set expanded tile title when value is passed", () => {
        wrapper.setState({ isExpanded: true });
        wrapper.setProps({ expandedTileTitle: "Expanded tile" });
        expect(wrapper.instance().props.expandedTileTitle).toBe("Expanded tile");
    });
});