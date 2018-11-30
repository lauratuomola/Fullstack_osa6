import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, ListGroup, ListGroupItem, Grid, Row, Col, Image } from 'react-bootstrap'
import {  Button, Form, FormGroup, Label, Input } from 'reactstrap'
import pouta from './pouta.jpg'

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ListGroup>
      {anecdotes.map(anecdote => (
        <ListGroupItem key={anecdote.id}>
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </ListGroupItem>
      ))}
    </ListGroup>
  </div>
)

const Anecdote = ({ anecdote }) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <div>has {anecdote.votes} votes</div>
      <div>for more info see: {anecdote.info} </div>
      <br />
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">
      Full Stack -sovelluskehitys
    </a>
    . See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: ''
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label> content </Label>
            <Input
              name="content"
              value={this.state.content}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label> author </Label>
            <Input
              name="author"
              value={this.state.author}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label> url for more info </Label>
            <Input
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button color="success">create</Button>
        </Form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info:
            'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1'
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2'
        }
      ],
      notification: '',
      msgStyle: {
        color: 'darkblue',
        fontSize: 26,
        border: '3px dotted #000',
        padding: 10,
        display: 'none'
      }
    }
  }

  addNew = anecdote => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `you created anecdote '${anecdote.content}'`,
      msgStyle: { ...this.state.msgStyle, display: '' }
    })
    setTimeout(
      () =>
        this.setState({
          notification: '',
          msgStyle: { ...this.state.msgStyle, display: 'none' }
        }),
      3000
    )
  }

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id)

  vote = id => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a))

    this.setState({ anecdotes })
  }

  render() {
    return (
      <div class="container">
        <h1>Software anecdotes</h1>
        <Router>
          <div>
              <Navbar>
                <Nav>
                <NavItem>
                  <NavLink to="/">anecdotes</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                  <NavLink to="/about">about</NavLink> &nbsp;
                </NavItem>
                <NavItem>
                  <NavLink to="/create">create new</NavLink>
                </NavItem>
                </Nav>
              </Navbar>
            <Route
              exact
              path="/"
              render={() => (
                <div>
                  <div style={this.state.msgStyle}>
                    {this.state.notification}
                  </div>
                  <AnecdoteList anecdotes={this.state.anecdotes} />
                </div>
              )}
            />
            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => (
                <Anecdote anecdote={this.anecdoteById(match.params.id)} />
              )}
            />
            <Route
              path="/about"
              render={() => (
                <div>
                  <Grid>
                    <Row>
                      <Col xs={12} md={7}>
                        <About />
                      </Col>
                      <Col xs={6} md={5}>
                        <Image src={pouta} circle />
                      </Col>
                    </Row>
                  </Grid>
                </div>
              )}
            />
            <Route
              path="/create"
              render={({ history }) => (
                <div>
                  <CreateNew history={history} addNew={this.addNew} />
                </div>
              )}
            />
          </div>
        </Router>

        <Footer />
      </div>
    )
  }
}

export default App
