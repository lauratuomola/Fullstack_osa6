import axios from 'axios'

const url = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(url)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(url, { anecdote, votes: 0 })
  return response.data

}

const vote = async (id, votedAnecdote) => {
  const response = await axios.put(`${url}/${id}`,  votedAnecdote )
  return response.data
}

export default { getAll, createNew, vote }