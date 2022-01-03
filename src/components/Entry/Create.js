import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { createEntry } from '../../api/entry'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class CreateEntry extends Component {
  constructor (props) {
    super(props)
    this.state = {
      entry: {
        subject: '',
        text: ''
      },
      createdId: null
    }
  }
handleChange = (event) => {
  event.persist()

  this.setState(prevState => {
    const updatedField = {
      [event.target.name]: event.target.value
    }
    this.setState(currState => {
      const updatedEntry = { ...currState.entry, ...updatedField }
      return { entry: updatedEntry }
    })
  })
}
handleSubmit = (event) => {
  event.preventDefault()

  const { user, msgAlert } = this.props

  createEntry(user, this.state.entry)
    .then((res) => {
      this.setState({ createdId: res.data.entryId })
    })
    .then(() => {
      msgAlert({
        heading: 'Entry Created Successfully',
        message: 'This is the message',
        variant: 'success'
      })
    })
    .catch((err) => {
      msgAlert({
        heading: 'Entry Creation Failed, try again!',
        messsage: 'Failed to POST, ERROR: ' + err.message,
        variant: 'danger'
      })
    })
}
render () {
  if (this.state.createdId) {
    return <Redirect to='/#/'/>
  }
  return (
    <React.Fragment>
      <h2 className="entryHeader">Thinking thoughts?</h2>
      <br/>
      <div className='capsuleEntry'>
        <Form onSubmit={this.handleSubmit}>
          <input
            className="form-control"
            placeholder="Subject"
            value={this.state.entry.subject}
            onChange={this.handleChange}
            name="subject"
          />
          <br/>

          <textarea
            className="form-control"
            placeholder="What's on your mind?"
            value={this.state.entry.text}
            onChange={this.handleChange}
            name="text"
          />
          <br/>

          <Button style={{ background: '#6B7B93', border: '#6B7B93' }}type="submit">Publish</Button>
        </Form>
      </div>
    </React.Fragment>
  )
}
}
export default withRouter(CreateEntry)
