import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { showEntry, deleteEntry } from '../../api/entry'

const ShowEntry = (props) => {
  // const [loading, setLoading] = useState(true)
  const [entry, setEntry] = useState(null)
  const { user, msgAlert, match, history } = props

  // useEffect for componentDidMount
  // Load the entry to show
  useEffect(() => {
    // runs just once on mount :)
    // const { id } = props.match.params

    showEntry(user, match.params.id)
      .then(res => {
        setEntry(res.data.entry)
      })
      .then(() => {
        msgAlert({
          heading: 'Show entry Success',
          message: 'See the entry there!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Show entry Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteEntry(user, match.params.id)
      .then(() => {
        msgAlert({
          heading: 'Entry deleted',
          message: 'should go back to index',
          variant: 'success'
        })
      })
      .then(() => history.push('/entries'))
      .catch(err => {
        msgAlert({
          heading: 'Deletion Failed',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  // If loading (entry is null), print 'Loading...'
  return (
    <div>
      {entry ? (
        <div>
          <h2>{entry.subject}</h2>
          <button onClick={handleDelete}>Delete</button>
          <Link to={'/update-entry/' + entry._id}>Update Entry</Link>
        </div>
      ) : 'Loading...'}
    </div>
  )
}

export default withRouter(ShowEntry)
