import * as dataActions from './dataActions'
import * as connectActions from './connectActions'
import * as dateActions from './dateActions'
import * as rmActions from './rmActions'
import * as expansionTileActions from "./expansionTileActions";

const actionTypes = {
  ...dataActions.actionTypes,
  ...connectActions.actionTypes,
  ...dateActions.actionTypes,
  ...rmActions.actionTypes,
  ...expansionTileActions.actionTypes
}

const actions = {
  ...dataActions.actions,
  ...connectActions.actions,
  ...dateActions.actions,
  ...rmActions.actions,
  ...expansionTileActions.actions
}

export {
  actionTypes,
  actions
}