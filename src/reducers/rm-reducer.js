import { actionTypes } from '../actions/index'
import moment from 'moment'

const initialState = {
}

export default function rmReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_RM:
      return {
        ...state,
        ...action.payload
      }

    default: return state
  }
}