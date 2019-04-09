<template>
  <div class="stacks-list">
    <section class="card">
      <h3 class="sub-title">Stack 列表</h3>
      <el-table
        :data="stacksList"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="Name">
        </el-table-column>
        <el-table-column
          prop="type"
          label="Type"
          width="160">
        </el-table-column>
        <el-table-column
          label="Services"
          width="320">
          <template slot-scope="scope">
            {{scope.row.services.length}}
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import {fetchServicesList} from '@/api/service.js'

export default {
  components: {},
  props: {},
  data () {
    return {
      stacksList: null
    }
  },
  async mounted () {
    let data = await fetchServicesList()
    let stacksList = []
    let matches = false
    data.forEach((service) => {
      const stackName = service.Spec.Labels['com.docker.stack.namespace']
      stacksList.forEach((stack) => {
        if (stackName === stack.name) {
          matches = true
          stack.services.push(service)
        }
      })
      if (!matches && stackName) {
        stacksList.push({
          name: stackName,
          services: [service],
          type: 'swarm'
        })
      }
    })
    this.stacksList = stacksList
  },
  methods: {}
}
</script>

<style lang="scss">
  .stacks-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
</style>
