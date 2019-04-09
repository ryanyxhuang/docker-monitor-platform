import axios from './base'

export async function fetchSettings (payload = {}) {
  const resp = await axios.get('/setting')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
