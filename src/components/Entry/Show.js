// import React, { Component } from 'react'
// // import { Redirect } from 'react-router-dom'
// import { withRouter } from 'react-router'

// // import axios from 'axios'
// // import apiUrl from '../../apiConfig'
// import { deleteEntry, showEntry, updateEntry } from '../../api/entry'
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'

// // import Form from 'react-bootstrap/Form'

// class ShowEntry extends Component {
//   constructor (props) {
//     super(props)

//     // this.deleteEntry = this.deleteEntry.bind(this)
//     this.state = {
//       form: {
//         subject: '',
//         text: ''
//       },
//       deleted: false,
//       updated: false
//     }
//   }

//   componentDidMount () {
//     showEntry(this.props.user, this.props.match.params.id)
//       .then(response => {
//         this.setState({ form: response.data.entry })
//       })
//       .catch(console.error)
//   }

//   handleInputChange = (event, props) => {
//     event.persist()
//     // console.log('event.target.value/name', event.target.name, event.target.value)
//     this.setState(prevState => {
//       const updatedField = {
//         [event.target.name]: event.target.value
//       }

//       const updatedData = Object.assign({}, prevState.form, updatedField)
//       return { form: updatedData }
//     })
//   }

//   onDeleteEntry = (event) => {
//     // event.preventDefault()
//     const { msgAlert, history, user } = this.props
//     const { _id } = this.state.form

//     // console.log('this is id', _id)
//     deleteEntry(user, _id)
//       .then(res => {
//         this.setState({ deleted: true })
//       })
//       .then(() => msgAlert({
//         heading: 'Successfully Deleted',
//         message: 'entry Delete Success',
//         variant: 'success'
//       }))
//       .then(() => history.push('/entries'))
//       .catch(() => msgAlert({
//         heading: 'Unable To Delete',
//         message: 'You Do Not Own This entry',
//         variant: 'danger'
//       }))
//       .then(() => history.push('/entries'))
//   }

//   onUpdateEntry = (event) => {
//     event.preventDefault()
//     // Create and empty formdata object
//     const data = new FormData()
//     // taking the data from the component state
//     // and append it to the data formdata object
//     // console.log('state.form', this.state.form)
//     data.append('subject', this.state.form.subject)
//     data.append('text', this.state.form.text)

//     const { msgAlert, history, user } = this.props
//     const { _id } = this.state.form

//     updateEntry(this.state.form, user, _id)
//       .then(() => msgAlert({
//         heading: 'Successfully Updated',
//         message: 'Updated',
//         variant: 'success'
//       }))
//       .then(() => history.push('/#'))
//       .then(res => {
//         this.setState({ updated: true })
//       })
//       .catch(() => msgAlert({
//         heading: 'Unable To Update',
//         message: 'You Do Not Own This entry',
//         variant: 'danger'
//       }))
//       .then(() => history.push('/#'))
//   }

//   render () {
//     return (
//       <div>
//         <h1>Update/Delete Page</h1>
//         {this.state.form && (
//           <div>
//             <h2>Subject {this.state.form.subject}</h2>
//             <h2>Text {this.state.form.text}</h2>
//           </div>
//         )}
//         <h1>Update Entry</h1>
//         <Form>
//           <label> Subject </label>
//           <input className="form-control"
//             placeholder="Entry Subject"
//             value={this.state.form.subject}
//             name="subject"
//             onChange={this.handleInputChange}
//           />
//           <label> Text </label>
//           <input className="form-control"
//             placeholder="Text"
//             value={this.state.form.text}
//             name="text"
//             onChange={this.handleInputChange}
//           />
//           <br/>
//           <Button onClick={this.onUpdateEntry}>Submit</Button>
//         </Form>
//         <br/>
//         <Button onClick={this.onDeleteEntry}>Delete</Button>
//       </div>
//     )
//   }
// }

// export default withRouter(ShowEntry)

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
          heading: 'Show Proentry Success',
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
