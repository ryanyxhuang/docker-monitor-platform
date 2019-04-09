import axios from './base'

export async function fetchServicesList (payload = {}) {
  const resp = await axios.get('/endpoint/local/docker/services')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
