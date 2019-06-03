<template>
  <div class="swarm-list">
    <section class="card">
      <h3 class="sub-title">
        集群列表
        <span style="float: right;opacity: 0.8" v-if="currentSwarm"><i class="el-icon-info"></i> 当前集群 &nbsp;&nbsp;{{currentSwarm}}</span>
      </h3>
      <div class="action-bar">
        <!--<el-button type="primary"-->
                   <!--@click="openEndpointDialog">-->
          <!--添加主机节点-->
        <!--</el-button>-->
      </div>
      <el-table
        :data="swarmList"
        style="width: 100%">
        <el-table-column
          type="selection">
        </el-table-column>
        <el-table-column
          prop="id"
          label="ID"
          width="160"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          label="Manager Nodes">
          <template slot-scope="scope">
            <ul class="nodes-list">
              <li v-for="(node, index) in scope.row.managerList" :key="index">
                {{node}}
              </li>
            </ul>
          </template>
        </el-table-column>
        <el-table-column
          prop="promPort"
          label="Promethus Port"
          width="100">
        </el-table-column>
        <el-table-column
          label="操作"
          width="160">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="setCurrentSwarm(scope.row.id, scope.row.managerList)"
              type="text"
              size="small">
              设为当前监控集群
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
export default {
  props: ['swarmList', 'currentSwarm'],
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
    setCurrentSwarm (id, managerList) {
      this.$emit('setCurrentSwarm', id, managerList)
    }
  }
}
</script>

<style lang="scss">
  .swarm-list {
    .sub-title {
      margin-bottom: 20px;
    }
  }
  .nodes-list {
    li {
      display: inline-block;
      margin-right: 12px;
    }
  }
</style>
