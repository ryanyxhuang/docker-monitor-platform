import axios from './base'

export async function fetchContainersList (payload = {}) {
  const resp = await axios.get('/endpoint/local/docker/containers/json')
  // console.log('resp', resp)
  // console.log(resp.data.code)
  // console.log(resp.data.data)
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
