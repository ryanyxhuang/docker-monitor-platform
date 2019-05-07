import axios from './base'
import {getCurrentEndpoint} from './endpoint.js'

export async function fetchContainersList (payload = {}) {
  const resp = await axios.get(`/endpoint/${getCurrentEndpoint()}/docker/containers/json`)
  if (resp.data.code === 200) {
    return resp.data.data
  }
}
