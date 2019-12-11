// import React from "react";
// import Enzyme, { shallow } from "enzyme";
// import { storeFactory } from "../../src/utils/test";
// import EnzymeAdapter from "enzyme-adapter-react-16";
import { actions } from "../../src/actions";
import ExpansionTileContainer, { mapStateToProps, mapDispatchToProps } from "../../src/containers/expansionTileContainer";

// Enzyme.configure({ adapter: new EnzymeAdapter() });

// const setup = (initialState) => {
//     const store = storeFactory(initialState);
//     const wrapper = shallow(<ExpansionTileContainer store={store} />);
//     return wrapper;
// }


const mockStore = {
    expansionTileInfo: {
        expandedTileId: null
    }
}

const dispatch = jest.fn();

describe("Expansion tile container ", () => {

    it("mapDispatchToProps should return a dispatcher", () => {
        const dispatchers = mapDispatchToProps(dispatch);
        expect(dispatchers.onExpansionTileToggle).toBeInstanceOf(Function);
    })

    it("mapDispatchToProps should toggle an action", () => {
        const dispatchers = mapDispatchToProps(dispatch);
        expect(dispatchers.onExpansionTileToggle("commissionTile")).toBeUndefined();
    })

    it("should give initialState using mapStateToProps", () => {
        const state = mapStateToProps(mockStore);
        expect(state.expandedTileId).toBeNull();
    })

    it("should give updated tile id using mapStateToProps", () => {
        const state = mapStateToProps({
            expansionTileInfo: {
                expandedTileId: "metricsTile"
            }
        });
        expect(state.expandedTileId).toBe("metricsTile");
    })
});