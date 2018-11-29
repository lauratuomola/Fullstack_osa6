

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'MESSAGE':
    return action.data.message
  case 'NO_MESSAGE':
    return ''
  default:
    return state
  }
}

export const message = (message) => {
  return{
    type: 'MESSAGE',
    data: { message }
  }
}


export default reducer
