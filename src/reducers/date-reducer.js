import { actionTypes } from '../actions/index'
import moment from 'moment'

const initialState = {
  startDate: moment().subtract(1, 'years'),
  endDate: moment().subtract(1, 'days')
}

export default function dateReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UPDATE_DATE:
      return {
        ...state,
        ...action.payload
      }

    default: return state
  }
}