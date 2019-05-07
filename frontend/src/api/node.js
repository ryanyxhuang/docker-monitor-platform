import axios from './base'
import {getCurrentEndpoint} from './endpoint.js'

export async function fetchNodesList (payload = {}) {
  const resp = await axios.get(`/endpoint/${getCurrentEndpoint()}/docker/nodes`)
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
