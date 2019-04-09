import axios from './base'

export async function fetchNodesList (payload = {}) {
  const resp = await axios.get('/endpoint/local/docker/nodes')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
