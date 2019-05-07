import axios from './base'
import {getCurrentEndpoint} from './endpoint.js'

export async function fetchServicesList (payload = {}) {
  const resp = await axios.get(`/endpoint/${getCurrentEndpoint()}/docker/services`)
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
