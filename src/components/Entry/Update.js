import React, { useState, useEffect } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { showEntry, updateEntry } from '../../api/entry'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const UpdateEntry = (props) => {
  const [entry, setEntry] = useState({ subject: '', text: '' })
  const [updated, setUpdated] = useState(false)
  const { user, msgAlert, match } = props

  useEffect(() => {
    // show req
    showEntry(user, match.params.id)
      .then((res) => setEntry(res.data.entry))
      .then(() =>
        msgAlert({
          heading: 'Entry shown',
          message: 'Yay',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Failed to show entry, see error below.',
          message: 'Error: ' + err.message,
          variant: 'danger'
        })
      )
  }, [])

  const handleChange = (event) => {
    const updatedField = { [event.target.name]: event.target.value }
    setEntry((prevEntry) => {
      const updatedEntry = { ...prevEntry, ...updatedField }
      return updatedEntry
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    updateEntry(user, entry, match.params.id)
      .then(() => setUpdated(true))
      .then(() =>
        msgAlert({
          heading: entry.subject + 'entered',
          message: 'Yay',
          variant: 'success'
        })
      )
      .catch((err) =>
        msgAlert({
          heading: 'Update failed',
          message: 'Whoops, ' + err.message,
          variant: 'danger'
        })
      )
  }

  if (updated) {
    return (
      <Redirect to={`/entries/${match.params.id}`} />

    )
  }

  return (
    <React.Fragment>
      <h1>Update entrynamehere</h1>
      <Form onSubmit={handleSubmit}>
        <input
          placeholder="Subject"
          value={entry.subject}
          onChange={handleChange}
          name="Subject"
        />
        <input
          placeholder="Text"
          value={entry.text}
          onChange={handleChange}
          name="text"
        />
        <Button type="submit">Update Entry</Button>
      </Form>
    </React.Fragment>
  )
}
export default withRouter(UpdateEntry)
