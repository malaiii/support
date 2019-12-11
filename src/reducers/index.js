import { combineReducers } from 'redux'
import data from './data-reducer'
import dateReducer from './date-reducer'
import rmInfo from './rm-reducer'
import expansionTileInfo from "./expansion-tile-reducer";

export default combineReducers({
  data,
  dateReducer,
  rmInfo,
  expansionTileInfo
})
