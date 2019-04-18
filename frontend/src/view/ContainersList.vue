<template>
  <div class="containers-list">
    <section class="card">
      <h3 class="sub-title">Container 列表</h3>
      <el-table
        :data="containersList"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="state"
          label="State"
          width="120">
        </el-table-column>
        <el-table-column
          prop="stack"
          label="Stack"
          width="120">
        </el-table-column>
        <el-table-column
          prop="image"
          label="Image"
          :show-overflow-tooltip="true"
          width="240">
        </el-table-column>
        <el-table-column
          prop="created"
          label="Created"
          width="200">
        </el-table-column>
        <el-table-column
          prop="endpoint"
          label="Endpoint"
          :show-overflow-tooltip="true"
          width="180">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="routeToContainerLog(scope.row)"
              icon="el-icon-document"
              type="text"
              size="small">
              日志
            </el-button>
          </template>
        </el-table-column>
        <!--<el-table-column-->
          <!--prop="NetworkSettings.Networks.IPAddress"-->
          <!--label="IP Address"-->
          <!--width="110">-->
        <!--</el-table-column>-->
        <!--<el-table-column-->
          <!--prop="Ports.PublicPort"-->
          <!--label="Ports"-->
          <!--width="80">-->
        <!--</el-table-column>-->
      </el-table>
    </section>
  </div>
</template>

<script>
import {fetchContainersList} from '@/api/container.js'
import {format as timeFormat} from '@/util/time'
import {getDeepValue} from '@/util'

export default {
  components: {},
  data () {
    return {
      containersList: null
    }
  },
  async mounted () {
    let data = await fetchContainersList()
    this.containersList = data.map((container) => {
      return {
        id: container.Id,
        name: container.Names[0],
        state: container.State,
        stack: container.Labels['com.docker.stack.namespace'],
        image: container.Image,
        created: timeFormat(new Date(container.Created * 1000), 'yyyy-MM-dd hh:mm:ss'),
        endpoint: getDeepValue(container.NetworkSettings.Networks, 'EndpointID')
      }
    })
  },
  methods: {
    routeToContainerLog (container) {
      this.$router.push({name: 'containerLog', params: {id: container.id}})
    }
  }
}
</script>

<style lang="scss">
  .containers-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
</style>
