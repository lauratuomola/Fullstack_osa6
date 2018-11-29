import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { message } from './../reducers/notificationReducer'



class AnecdoteForm extends React.Component {

  handleSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    this.props.createAnecdote(anecdote)
    this.props.message(`you created '${anecdote}'`)
    setTimeout(() => this.props.message(''), 3000)
  }
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote' /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

AnecdoteForm.contextTypes = {
  store: PropTypes.object
}

const mapDispatchToProps = {
  createAnecdote,
  message
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
