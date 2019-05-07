<template>
  <div class="nodes-list">
    <section class="card">
      <h3 class="sub-title">主机列表</h3>
      <div class="action-bar">
        <el-button type="primary"
                   @click="openEndpointDialog">
          添加主机节点
        </el-button>
      </div>
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
        <el-table-column
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="setCurrentEndpoint(scope.row.name)"
              type="text"
              size="small">
              设为当前监控节点
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  props: ['endpointList'],
  methods: {
    openEndpointDialog () {
      this.$prompt('节点ip', '创建节点', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        // inputPattern: /(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})(\.(2(5[0-5]{1}|[0-4]\d{1})|[0-1]?\d{1,2})){3}/g,
        inputErrorMessage: 'ip格式错误'
      }).then(({value}) => {
        this.$emit('createEndpoint', value)
      })
    },
    setCurrentEndpoint (name) {
      this.$emit('setCurrentEndpoint', name)
    }
  }
}
</script>

<style lang="scss">
  .nodes-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
</style>
