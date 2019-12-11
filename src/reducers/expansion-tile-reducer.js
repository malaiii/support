import { actionTypes } from "../actions/index";

const initialState = {
    expandedTileId: null
}

const expansionTileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ON_EXPANSION_TILE_TOGGLE:
            return {
                ...state,
                expandedTileId: action.payload
            }
        default:
            return state
    }
}

export default expansionTileReducer;