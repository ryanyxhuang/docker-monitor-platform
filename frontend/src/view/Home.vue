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
                     :dataAnalysis="dataAnalysis"
      />
      <endpoints-list class="endpoint-list"
        :endpointList="endpointList"
        @createEndpoint="createEndpoint"
        @setCurrentEndpoint="setCurrentEndpoint"
      />
      <!--<swarms-list class="swarm-list"-->
        <!--:swarmList="swarmList"-->
        <!--@createEndpoint="createEndpoint"-->
        <!--@setCurrentEndpoint="setCurrentEndpoint"-->
      <!--/>-->
  </div>
</template>

<script>
import EndpointsList from '@/components/EndpointsList'
import SwarmsList from '@/components/SwarmsList'
import EndpointInfo from '@/components/EndpointInfo'
import MonitorSummary from '@/components/MonitorSummary'
import {getContainersWithHignNetIO,
  getContainersWithHignDiskIO,
  getContainersWithHighCPUUsage,
  getContainersWithHighMemoryUsage} from '@/api/metrics'
import {fetchEndpointInfo, fetchEndpointList, addEndpoint, setCurrentEndpoint} from '@/api/endpoint'
import {fetchSettings} from '@/api/setting'
import {fetchServicesList} from '@/api/service.js'
import {fetchContainersList} from '@/api/container.js'
import {fetchSwarmList} from '@/api/swarm.js'

export default {
  components: {
    EndpointsList,
    EndpointInfo,
    MonitorSummary,
    SwarmsList
  },
  data () {
    return {
      nodesList: null,
      containersWithHignNetIO: [],
      containersWithHignDiskIO: [],
      containersWithHighCPUUsage: [],
      containersWithHighMemoryUsage: [],
      currentEndpointInfo: null,
      endpointList: [],
      swarmList: [],
      settings: {},
      dataAnalysis: {}
    }
  },
  async mounted () {
    this.settings = await this.fetchSettings()
    this.loadData()
    this.loadMetrics()
    setInterval(() => this.loadMetrics(), 20000)
    this.loadAnalysis()
  },
  methods: {
    async loadData () {
      const [currentEndpointInfo,
        endpointList,
        swarmList,
      ] = await Promise.all([
        fetchEndpointInfo(),
        fetchEndpointList(),
        fetchSwarmList(),
        getContainersWithHignNetIO(this.settings),
        getContainersWithHignDiskIO(this.settings),
        getContainersWithHighCPUUsage(this.settings),
        getContainersWithHighMemoryUsage(this.settings)
      ])
      this.currentEndpointInfo = currentEndpointInfo
      this.endpointList = endpointList
      this.swarmList = swarmList
    },
    async loadMetrics () {
      const [
        containersWithHignNetIO,
        containersWithHignDiskIO,
        containersWithHighCPUUsage,
        containersWithHighMemoryUsage
      ] = await Promise.all([
        getContainersWithHignNetIO(this.settings),
        getContainersWithHignDiskIO(this.settings),
        getContainersWithHighCPUUsage(this.settings),
        getContainersWithHighMemoryUsage(this.settings)
      ])
      this.containersWithHignNetIO = containersWithHignNetIO
      this.containersWithHignDiskIO = containersWithHignDiskIO
      this.containersWithHighCPUUsage = containersWithHighCPUUsage
      this.containersWithHighMemoryUsage = containersWithHighMemoryUsage
    },
    async fetchSettings () {
      const obj = {}
      const settings = await fetchSettings()
      settings.forEach((settings) => {
        obj[settings.key] = settings.value
      })
      return obj
    },
    async loadAnalysis () {
      const [servicesList, containersList
      ] = await Promise.all([
        fetchServicesList(),
        fetchContainersList()
      ])

      let stacksList = []
      let matches = false
      servicesList.forEach((service) => {
        const stackName = service.Spec.Labels['com.docker.stack.namespace']
        stacksList.forEach((stack) => {
          if (stackName === stack.name) {
            matches = true
            stack.services.push(service)
          }
        })
        if (!matches && stackName) {
          stacksList.push({
            id: service.Id,
            name: stackName,
            services: [service],
            type: 'swarm'
          })
        }
      })

      this.dataAnalysis.stacksNum = stacksList.length
      this.dataAnalysis.containersNum = containersList.length
      this.dataAnalysis.servicesNum = servicesList.length
    },
    async createEndpoint (value) {
      const error = await addEndpoint({ip: value})
      if (!error) {
        this.$message.success(`节点[ip: ${value}]创建成功`)
        this.endpointList = await fetchEndpointList()
      } else {
        this.$message.error(`节点创建失败 ${error}`)
      }
    },
    setCurrentEndpoint (name) {
      setCurrentEndpoint(name)
      this.loadData()
    }
  }
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
