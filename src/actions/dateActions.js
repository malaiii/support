
export const actionTypes = {
  UPDATE_DATE: 'UPDATE_DATE'
}

function updateDate(payload) {
  return {
    type: actionTypes.UPDATE_DATE,
    payload
  }

}

export const actions = {
  updateDate
}