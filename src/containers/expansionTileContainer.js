import { connect } from "react-redux";
import { actions } from '../actions/index';
import ExpansionTile from "../components/ExpansionTile/ExpansionTile"

/**
 * @description - Map value of store state with the component properties.
 * 
 * @param {object} state - Redux store state.
 */
export const mapStateToProps = (state) => {
    return {
        expandedTileId: state && state.expansionTileInfo && state.expansionTileInfo.expandedTileId,
    }
}

/**
 * @description - Map the dispatching actions with the component properties.
 * 
 * @param {function} dispatch - Function that can be used to dispatch the action.
 */
export const mapDispatchToProps = (dispatch) => {
    return {
        onExpansionTileToggle: (expandedTileId) => dispatch(actions.handleExpansionTileToggle(expandedTileId)),
    }
}

/**
 * @exports ExpansionTile - Container for the expansion tile component.
 */
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ExpansionTile)