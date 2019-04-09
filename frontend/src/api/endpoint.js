import axios from './base'

export async function fetchEndpointInfo (payload = {}) {
  const resp = await axios.get('/endpoint/local')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}

export async function fetchEndpointList (payload = {}) {
  const resp = await axios.get('/endpoint')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
