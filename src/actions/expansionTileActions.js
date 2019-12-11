export const actionTypes = {
    ON_EXPANSION_TILE_TOGGLE: "ON_EXPANSION_TILE_TOGGLE",
    CLONE_ULTRA_STORT_ACTIVITY_DATA: "CLONE_ULTRA_STORT_ACTIVITY_DATA"
}

const handleExpansionTileToggle = (payload) => {
    return {
        type: actionTypes.ON_EXPANSION_TILE_TOGGLE,
        payload
    }
}

const cloneUltraShortActivityData = (payload) => {
    return {
        type: actionTypes.CLONE_ULTRA_STORT_ACTIVITY_DATA,
        payload
    }
}

export const actions = {
    handleExpansionTileToggle,
    cloneUltraShortActivityData
}