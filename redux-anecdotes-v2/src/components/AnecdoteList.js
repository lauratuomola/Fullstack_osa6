import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { voteAnecdote } from './../reducers/anecdoteReducer'
import { message } from './../reducers/notificationReducer'
// import anecdoteService from './../services/anecdotes'

class AnecdoteList extends React.Component {
  vote = (anecdote) => {
    this.props.voteAnecdote(anecdote)
    this.props.message(`you voted '${anecdote.anecdote}'`)
    setTimeout(() => this.props.message(''), 3000)
  }

  render() {
    const { anecdotes } = this.props
    console.log(anecdotes)
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.anecdote}</div>
              <div>
                has {anecdote.votes}
                <button
                  onClick={() => this.vote(anecdote) }
                >
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}
AnecdoteList.contextTypes = {
  store: PropTypes.object
}
const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes
  }
}
const mapDispatchToProps = {
  voteAnecdote,
  message
}

const ConnectedAnecdoteList=connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList
