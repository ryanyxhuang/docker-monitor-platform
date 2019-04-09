<template>
  <div class="services-list">
    <section class="card">
      <h3 class="sub-title">Service 列表</h3>
      <el-table
        :data="servicesList"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="Name"
          :show-overflow-tooltip="true">
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
          label="Ports">
          <template slot-scope="scope">
            <ul class="ports-list">
              <li v-for="(port, index) in scope.row.ports" :key="index">
                {{port.TargetPort}}:{{port.PublishedPort}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          prop="schedulingMode"
          label="Scheduling Mode"
          width="180">
          <template slot-scope="scope">
            <div>{{scope.row.mode}}
              <span v-if="scope.row.mode==='replicated'">{{scope.row.preReplicas}}/{{scope.row.replicas}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="updateTime"
          label="Last Update"
          width="200">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import {fetchServicesList} from '@/api/service.js'
import {format as timeFormat} from '@/util/time'

export default {
  components: {},
  data () {
    return {
      servicesList: null
    }
  },
  async mounted () {
    let data = await fetchServicesList()
    this.servicesList = data.map((service) => {
      let mode, replicas, preReplicas
      if (service.Spec.Mode && service.Spec.Mode.Replicated) {
        mode = 'replicated'
        replicas = service.Spec.Mode.Replicated.Replicas
        if (service.PreviousSpec) {
          preReplicas = replicas
          // todo
          // preReplicas = service.PreviousSpec.Mode.Replicated.Replicas
        } else {
          preReplicas = replicas
        }
      } else {
        mode = 'global'
      }

      return {
        name: service.Spec.Name,
        stack: service.Spec.Labels['com.docker.stack.namespace'] || null,
        image: service.Spec.TaskTemplate.ContainerSpec.Image,
        ports: service.Endpoint.Spec.Ports || [],
        schedulingMode: service.Spec.Mode,
        updateTime: timeFormat(new Date(service.UpdatedAt), 'yyyy-MM-dd hh:mm:ss'),
        mode,
        replicas,
        preReplicas
      }
    })
  },
  methods: {},
  filters: {
  }
}
</script>

<style lang="scss">
  .services-list {
    .sub-title {
      margin-bottom: 20px;
    }
    .ports-list {
      li {
        display: inline-block;
        margin-right: 12px;
      }
    }
  }
</style>
