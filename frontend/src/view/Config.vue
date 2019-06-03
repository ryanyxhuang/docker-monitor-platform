<template>
  <div class="config">
      <swarms-list class="swarm-list"
                   :currentSwarm="currentSwarm"
                   :swarmList="swarmList"
                   @setCurrentSwarm="setCurrentSwarm"
      />
      <!--<endpoint-info class="endpoint-info"-->
        <!--:endpointInfo="currentEndpointInfo"-->
                     <!--:dataAnalysis="dataAnalysis"-->
      <!--/>-->
      <endpoints-list class="endpoint-list"
        :currentEndpoint="currentEndpointInfo"
        :endpointList="endpointList"
        @createEndpoint="createEndpoint"
        @setCurrentEndpoint="setCurrentEndpoint"
      />
  </div>
</template>

<script>
import EndpointsList from '@/components/EndpointsList'
import SwarmsList from '@/components/SwarmsList'
import EndpointInfo from '@/components/EndpointInfo'
import {fetchEndpointInfo, fetchEndpointList, addEndpoint, setCurrentEndpoint, getRelatedSwarmId} from '@/api/endpoint'
import {fetchSwarmList, setCurrentSwarm, getCurrentSwarm} from '@/api/swarm.js'

export default {
  components: {
    EndpointsList,
    EndpointInfo,
    SwarmsList
  },
  data () {
    return {
      currentEndpointInfo: null,
      endpointList: [],
      swarmList: [],
      dataAnalysis: {},
      currentSwarm: null
    }
  },
  async mounted () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const [currentEndpointInfo,
        endpointList,
        swarmList] = await Promise.all([
        fetchEndpointInfo(),
        fetchEndpointList(),
        fetchSwarmList()
      ])
      this.currentSwarm = getCurrentSwarm()
      this.currentEndpointInfo = currentEndpointInfo
      this.endpointList = endpointList
      this.swarmList = swarmList
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
    async setCurrentEndpoint (name) {
      setCurrentEndpoint(name)
      const swarmId = await getRelatedSwarmId()
      setCurrentSwarm(swarmId)
      this.loadData()
    },
    async setCurrentSwarm (id, managerList) {
      setCurrentSwarm(id)
      setCurrentEndpoint(managerList[0])
      this.loadData()
    }
  }
}
</script>

<style lang="scss">
  .config {
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
