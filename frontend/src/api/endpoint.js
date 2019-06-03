import axios from './base'
import Cookies from 'js-cookie'

export async function fetchEndpointInfo (payload = {}) {
  const resp = await axios.get(`/endpoint/${getCurrentEndpoint()}`)
  console.log('resp', resp)
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

export async function testEndpoint (payload = {}) {
  const resp = await axios.get('/proxy/docker/info')
  if (resp.data.code === 200) {
    return resp.data.data
  }
}

export async function addEndpoint (payload = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/endpoint`,
    data: {
      name: payload.name || payload.ip,
      ip: payload.ip,
      dockerUrl: `${payload.ip}:2375`,
      promUrl: `${payload.ip}:9090`
    }
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}

export async function getRelatedSwarmId () {
  const resp = await axios.get(`/swarm_mng_endpoint?manageNodeId=${getCurrentEndpoint()}`)
  if (resp.data.code === 200) {
    console.log('resp', resp)
    const relations = resp.data.data
    if (relations.length === 0) {
      return null
    }
    return relations[0].swarmId
  }
}

export function setCurrentEndpoint (key) {
  if (key) {
    Cookies.set('currentEndpoint', key)
  } else {
    Cookies.remove('currentEndpoint')
  }
}

export function getCurrentEndpoint () {
  return Cookies.get('currentEndpoint') || 'local'
}
