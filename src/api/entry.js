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
