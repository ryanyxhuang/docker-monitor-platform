import axios from './base'
import {getCurrentEndpoint} from './endpoint.js'

import {b64EncodeUnicode, byteTransferConver, byteConver} from '@/util'

export async function getContainersWithHignNetIO (payload = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/endpoint/${getCurrentEndpoint()}/prom/api/v1/query`,
    data: {'query': `sum(rate(container_network_receive_bytes_total{id=~"/docker/.*"}[${payload.promInterval}]) + rate(container_network_transmit_bytes_total{id=~"/docker/.*"}[${payload.promInterval}])) by (name) >${payload.netIOThreshold}`
    },
    headers: {
      'Authorization': `Basic ${b64EncodeUnicode(payload.promAccount)}`
    }
  })

  if (resp.data.code === 200) {
    return resp.data.data.result.map((item) => {
      if (item.value[1]) {
        item.value[1] = byteTransferConver(item.value[1], 2)
      }
      return item
    })
  }
}

export async function getContainersWithHignDiskIO (payload = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/endpoint/${getCurrentEndpoint()}/prom/api/v1/query`,
    data: {'query': `sum(rate(container_fs_io_current{id=~"/docker/.*"}[${payload.promInterval}])) by (name) > ${payload.diskIOThreshold}`
    },
    headers: {
      'Authorization': `Basic ${b64EncodeUnicode(payload.promAccount)}`
    }
  })

  if (resp.data.code === 200) {
    return resp.data.data.result.map((item) => {
      if (item.value[1]) {
        item.value[1] = byteTransferConver(item.value[1], 2)
      }
      return item
    })
  }
}

export async function getContainersWithHighCPUUsage (payload = {}) {
  console.log(payload.promInterval, payload.cpuUsageThreshold, `sum(irate(container_cpu_usage_seconds_total{id=~"/docker/.*"}[${payload.promInterval}])) by (name) * 100 > ${payload.cpuUsageThreshold}`)
  const resp = await axios({
    method: 'POST',
    url: `/endpoint/${getCurrentEndpoint()}/prom/api/v1/query`,
    data: {'query': `sum(irate(container_cpu_usage_seconds_total{id=~"/docker/.*"}[${payload.promInterval}])) by (name) * 100 > ${payload.cpuUsageThreshold}`
    },
    headers: {
      'Authorization': `Basic ${b64EncodeUnicode(payload.promAccount)}`
    }
  })

  if (resp.data.code === 200) {
    return resp.data.data.result.map((item) => {
      item.value[1] = `${Number(item.value[1]).toFixed(2)}%`
      return item
    })
  }
}

export async function getContainersWithHighMemoryUsage (payload = {}) {
  const resp = await axios({
    method: 'POST',
    url: `/endpoint/${getCurrentEndpoint()}/prom/api/v1/query`,
    headers: {
      'Authorization': `Basic ${b64EncodeUnicode(payload.promAccount)}`
    },
    data: {'query': `avg_over_time(container_memory_usage_bytes{id=~"/docker/.*"}[${payload.promInterval}]) > ${payload.memoryUsageThreshold}`
    }
  })

  if (resp.data.code === 200) {
    return resp.data.data.result.filter((item) => {
      return item.metric && item.metric.name
    }).map((item) => {
      item.value[1] = `${byteConver(item.value[1], 2)}`
      return item
    })
  }
}
