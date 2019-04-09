<template>
  <div class="nodes-list">
    <section class="card">
      <h3 class="sub-title">Node 列表</h3>
      <el-table
        :data="nodesList"
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
          prop="role"
          label="Role"
          width="160">
        </el-table-column>
        <el-table-column
          prop="nanoCPUs"
          label="Nano CPUs"
          width="200">
        </el-table-column>
        <el-table-column
          prop="engine"
          label="Engine"
          width="160">
        </el-table-column>
        <el-table-column
          prop="address"
          label="IP Address"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="Status"
          width="180">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import {fetchNodesList} from '@/api/node.js'

export default {
  components: {},
  data () {
    return {
      nodesList: null
    }
  },
  async mounted () {
    let data = await fetchNodesList()
    this.nodesList = data.map((node) => {
      return {
        name: node.Description.Hostname,
        role: node.Spec.Role,
        nanoCPUs: node.Description.Resources.NanoCPUs,
        engine: node.Description.Engine.EngineVersion,
        address: node.Status.Addr,
        status: node.Status.State
      }
    })
  },
  methods: {}
}
</script>

<style lang="scss">
  .nodes-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
</style>
