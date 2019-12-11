
export const actionTypes = {
  UPDATE_RM: 'UPDATE_RM'
}

function updateRM(payload) {
  return {
    type: actionTypes.UPDATE_RM,
    payload
  }

}

export const actions = {
  updateRM
}