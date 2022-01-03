import React, { Component, Fragment } from 'react'
import { Link, withRouter } from 'react-router-dom'

import { indexEntry } extends Component {
    constructor () {
        super()
        this.state = {
            entryArray: []
        }
    }
    
    componentDidMount() {
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
        if(!this.state.entryArray) {
            return (
                'nothign jhere to seee right msg: ' + this.state.entry
            )
        } else if (this.state.entryArray.length === 0) {
            return (
                ':('
            )
        } else {
            return (
                <div>
                this.state.entryArray.map(entry = (
                    <Fragment key={entry._id}>
                    <h4>{entry.subject}</h4>
                    <h6>{entry.text}</h6>
                    <p>{entry.timestamps}</p>
                    </Fragment>
                ))
                </div>
            )
        }
    }
}

export default withRouter(IndexEntry)