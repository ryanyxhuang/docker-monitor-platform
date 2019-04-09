<template>
  <div class="home">
      <monitor-summary class="monitor-info"
                       :endpoint="currentEndpointInfo"
                       :containersWithHignNetIO="containersWithHignNetIO"
                       :containersWithHignDiskIO="containersWithHignDiskIO"
                       :containersWithHighCPUUsage="containersWithHighCPUUsage"
                       :containersWithHighMemoryUsage="containersWithHighMemoryUsage"
      />
      <endpoint-info class="endpoint-info"
        :endpointInfo="currentEndpointInfo"
      />
      <endpoints-list class="endpoint-list"
        :endpointList="endpointList"
      />
  </div>
</template>

<script>
import EndpointsList from '@/components/EndpointsList'
import EndpointInfo from '@/components/EndpointInfo'
import MonitorSummary from '@/components/MonitorSummary'
import {getContainersWithHignNetIO,
  getContainersWithHignDiskIO,
  getContainersWithHighCPUUsage,
  getContainersWithHighMemoryUsage} from '@/api/metrics'
import {fetchEndpointInfo, fetchEndpointList} from '@/api/endpoint'

export default {
  components: {
    EndpointsList,
    EndpointInfo,
    MonitorSummary
  },
  data () {
    return {
      nodesList: null,
      containersWithHignNetIO: [],
      containersWithHignDiskIO: [],
      containersWithHighCPUUsage: [],
      containersWithHighMemoryUsage: [],
      currentEndpointInfo: null,
      endpointList: []
    }
  },
  async mounted () {
    const [containersWithHignNetIO,
      containersWithHignDiskIO,
      containersWithHighCPUUsage,
      containersWithHighMemoryUsage,
      currentEndpointInfo,
      endpointList
    ] = await Promise.all([
      getContainersWithHignNetIO(),
      getContainersWithHignDiskIO(),
      getContainersWithHighCPUUsage(),
      getContainersWithHighMemoryUsage(),
      fetchEndpointInfo(),
      fetchEndpointList()
    ])
    this.containersWithHignNetIO = containersWithHignNetIO
    this.containersWithHignDiskIO = containersWithHignDiskIO
    this.containersWithHighCPUUsage = containersWithHighCPUUsage
    this.containersWithHighMemoryUsage = containersWithHighMemoryUsage
    this.currentEndpointInfo = currentEndpointInfo
    this.endpointList = endpointList
  },
  methods: {}
}
</script>

<style lang="scss">
  .home {
    .sub-title {
      margin-bottom: 10px;
    }
    .current-endpoint {
      display: flex;
    }
    .endpoint-info {
      flex: 2;
    }
    .monitor-info {
      flex: 1;
    }
    .endpoint-list {
      /*margin-top: 18px;*/
    }
  }
</style>
