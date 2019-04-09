<template>
  <div class="monitor-summary">
    <section class="card">
      <h3 class="sub-title">监控</h3>
      <el-tabs v-model="monitorType" type="card" @tab-click="handleMonitorTypeChange">
        <el-tab-pane label="  指标监控  " name="metrics" style="padding:0 16px">
          <el-tabs v-model="dockerMonitorCategory" @tab-click="handleDockerMonitorCategoryChange" de>
            <el-tab-pane label="高网络IO容器" name="containersWithHignNetIO"></el-tab-pane>
            <el-tab-pane label="高磁盘IO容器" name="containersWithHignDiskIO"></el-tab-pane>
            <el-tab-pane label="高CPU使用容器" name="containersWithHighCPUUsage"></el-tab-pane>
            <el-tab-pane label="高内存使用容器" name="containersWithHighMemoryUsage"></el-tab-pane>
          </el-tabs>
          <el-table
            size="small"
            :data="tableData"
            max-height="720"
            style="width: 100%">
            <el-table-column
              label="Name"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{scope.row.metric.name}}
              </template>
            </el-table-column>
            <el-table-column
              label="UsageAmount"
              width="400"
              :show-overflow-tooltip="true">
              <template slot-scope="scope">
                {{scope.row.value[1]}}
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label=" Swarm集群服务监控 " name="services">
          <iframe :src=promNodeUrl
                  height="720"
                  width="100%"
                  frameborder="0"
                  scrolling="0">
          </iframe>
        </el-tab-pane>
        <el-tab-pane label=" Swarm集群节点监控 " name="nodes">
          <iframe :src=promServiceUrl
                  height="720"
                  width="100%"
                  frameborder="0"
                  scrolling="0">
          </iframe>
        </el-tab-pane>
      </el-tabs>
    </section>
  </div>
</template>

<script>
const DEFAUTMONITORCATEGORY = 'containersWithHignNetIO'

export default {
  props: ['endpoint',
    'containersWithHignNetIO',
    'containersWithHignDiskIO',
    'containersWithHighCPUUsage',
    'containersWithHighMemoryUsage'],
  data () {
    return {
      monitorType: 'metrics',
      dockerMonitorCategory: DEFAUTMONITORCATEGORY
    }
  },
  computed: {
    tableData () {
      return this.$props[this.dockerMonitorCategory]
    },
    promUrl () {
      const endpoint = this.$props.endpoint
      if (!endpoint) {
        return null
      }
      const promUrlArr = endpoint.promUrl.split(':')
      const host = promUrlArr[promUrlArr.length - 2]
      return this.$props.grafanaUrl || `${host}:3000`
    },
    promNodeUrl () {
      return `http://${this.promUrl}/d/BPlb-Sgik/docker-swarm-nodes?refresh=30s&orgId=1`
    },
    promServiceUrl () {
      return `http://${this.promUrl}/d/zr_baSRmk/docker-swarm-services?refresh=30s&orgId=1`
    }
  },
  methods: {
    handleMonitorTypeChange (type) {
      // this.monitorType = type
    },
    handleDockerMonitorCategoryChange (target) {
      this.tableData = this.$props[target.name]
    }
  }
}
</script>

<style lang="scss">
  .monitor-summary {
    .sub-title {
      margin-bottom: 20px;
      .link {
        margin-left: 8px;
      }
    }
    &-main {
      height: 400px;
      display: flex;
      margin-bottom: -1px;
      li {
        background: #F5F5F6;
        border: 1px solid #F5F5F6;
        height: 50px;
        line-height: 50px;
        margin-bottom: 1px;
      }
    }
    &-category {
      width: 280px;
      margin-right: 30px;
    }
  }
</style>
