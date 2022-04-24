import apiUrl from '../apiConfig'
import axios from 'axios'

export const createEntry = (user, data) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/entries',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { entry: data }
  })
}

export const indexEntry = (user) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/entries',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}

export const updateEntry = (user, data, entryId) => {
  return axios({
    method: 'PATCH',
    url: apiUrl + '/entries/' + entryId,
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    // data: data
    data: { entry: data }
  })
}

export const showEntry = (user, entryId) => {
  return axios({
    method: 'GET',
    url: apiUrl + '/entries/' + entryId,
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteEntry = (user, entryId) => {
  return axios({
    url: apiUrl + '/entries/' + entryId,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}
