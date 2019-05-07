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
      dockerUrl: `${payload.ip}:2376`,
      promUrl: `${payload.ip}:9090`
    }
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}

export function setCurrentEndpoint (key) {
  Cookies.set('currentEndpoint', key)
}

export function getCurrentEndpoint () {
  return Cookies.get('currentEndpoint') || 'local'
}
