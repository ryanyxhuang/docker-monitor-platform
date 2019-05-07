import axios from './base'
import {getCurrentEndpoint} from './endpoint.js'

export async function fetchSwarmInfo (payload = {}) {
  const resp = await axios.get(`/endpoint/${getCurrentEndpoint()}/docker/swarm`)
  if (resp.data.code === 200) {
    return resp.data.data
  }
  return null
}

export async function createSwarm (endpoint = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/endpoint/${getCurrentEndpoint()}/docker/swarm/init`,
    data: {
      'ListenAddr': '0.0.0.0:2377',
      'AdvertiseAddr': endpoint.ip
    }
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}

export async function leaveSwarm (targetAddr) {
  const resp = await axios({
    method: 'POST',
    url: `/proxy/docker/swarm/leave?force=1`,
    data: {
      proxyTargetIp: targetAddr
    }
  })
  if (resp.data.code !== 200) {
    return '删除节点失败'
  }
}

export async function joinSwarm (targetAddr, joinToken, managerIp) {
  const resp = await axios({
    method: 'POST',
    url: `/proxy/docker/swarm/join`,
    data: {
      proxyTargetIp: targetAddr,
      ListenAddr: '0.0.0.0:2377',
      'RemoteAddrs': [
        `${managerIp}:2377`
      ],
      JoinToken: joinToken
    }
  })
  if (resp.data.code !== 200) {
    return resp.data.message
  }
}
