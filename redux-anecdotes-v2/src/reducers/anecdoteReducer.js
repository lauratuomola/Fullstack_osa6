
import anecdoteService from '../services/anecdotes'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'VOTE': {
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes + 1 }]
  }
  case 'CREATE': {
    return [...store, action.data]
  }
  case 'INIT_ANECDOTES': {
    return store=action.anecdotes
  }
  }
  return store
}
export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      anecdotes
    })
  }
}

export const voteAnecdote = (anecdote) => {
  const voted = { ...anecdote, votes: anecdote.votes + 1 }
  return async (dispatch) => {
    await anecdoteService.vote(anecdote.id, voted)
    dispatch({
      type: 'VOTE',
      data: { id: anecdote.id, anecdote: anecdote.anecdote }
    })
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export default reducer