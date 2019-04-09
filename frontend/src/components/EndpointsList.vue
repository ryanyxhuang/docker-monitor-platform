<template>
  <div class="nodes-list">
    <section class="card">
      <h3 class="sub-title">主机列表</h3>
      <el-table
        :data="endpointList"
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
          prop="dockerUrl"
          label="Docker Url"
          width="300">
        </el-table-column>
        <el-table-column
          prop="promUrl"
          label="Promethus Url"
          width="300">
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  props: ['endpointList']
}
</script>

<style lang="scss">
  .nodes-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
</style>
