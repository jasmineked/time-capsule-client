import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { indexEntry } from '../../api/entry'
// import moment from 'moment'

class IndexEntry extends Component {
  constructor () {
    super()
    this.state = {
      entryArray: []
    }
  }

  componentDidMount () {
    const { user, msgAlert } = this.props

    indexEntry(user)
      .then(res => {
        console.log(res)
        this.setState({ entryArray: res.data.entries })
      })
      .then(() => {
        msgAlert({
          heading: 'Index Success',
          message: 'All entries should display',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Entry index failed',
          message: 'Failed with err: ' + err.message,
          variant: 'danger'
        })
      })
  }

  render () {
    if (!this.state.entryArray) {
      return (
        'Nothing to see here!: ' + this.state.entry
      )
    } else if (this.state.entryArray.length === 0) {
      return (
        ':('
      )
    } else {
      return (
        <div>
          {this.state.entryArray.map(entry => (
            <Fragment key={entry._id}>
              <Link to={`/entries/${entry._id}`}>
                <h4>{entry.subject}</h4>
              </Link>
            </Fragment>
          ))}
        </div>
      )
    }
  }
}

export default withRouter(IndexEntry)
