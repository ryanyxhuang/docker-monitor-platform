<template>
  <div class="nodes-list">
    <section class="card">
      <h3 class="sub-title">Node 列表</h3>
      <div class="action-bar">
        <el-button v-if="!swarmInfo"
                   type="primary"
                   @click="createSwarm">
          创建swarm集群
        </el-button>
        <el-button v-if="swarmInfo"
                   type="primary"
                   @click="leaveSwarm"
                   :disabled="nodeSelection.length<1">
          删除swarm节点
        </el-button>
        <el-button v-if="swarmInfo"
                   type="primary"
                   @click="dialogVisible = true">
          添加swarm节点
        </el-button>
      </div>
      <el-dialog
        title="添加swarm节点"
        :visible.sync="dialogVisible"
        width="60%">
        <el-form ref="form" :model="joinFormInfo" label-width="180px">
          <el-form-item label="作为管理节点">
            <el-switch v-model="joinFormInfo.isManager"></el-switch>
          </el-form-item>
          <el-form-item label="IP">
            <el-input v-model="joinFormInfo.ip"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="joinSwarm">确 定</el-button>
        </span>
      </el-dialog>
      <el-table
        :data="nodesList"
        @selection-change="handleSelectionChange"
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
import {fetchSwarmInfo, createSwarm, leaveSwarm, joinSwarm} from '@/api/swarm.js'
import {fetchEndpointInfo} from '@/api/endpoint.js'

export default {
  components: {},
  data () {
    return {
      nodesList: null,
      swarmInfo: null,
      nodeSelection: [],
      currentEndpoint: null,
      dialogVisible: false,
      joinFormInfo: {
        isManager: false,
        ip: ''
      }
    }
  },
  computed: {
    managerNodes () {
      return this.nodesList.filter((node) => {
        return node.role === 'manager'
      })
    }
  },
  async mounted () {
    let currentEndpoint = await fetchEndpointInfo()
    currentEndpoint.ip = currentEndpoint.dockerUrl.split(':')[0]
    this.currentEndpoint = currentEndpoint
    this.fetchSwarmInfo()
  },
  methods: {
    async fetchSwarmInfo () {
      let swarmInfo = await fetchSwarmInfo()
      this.swarmInfo = swarmInfo
      if (!swarmInfo) {
        this.nodesList = []
        return
      }
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
    handleSelectionChange (val) {
      this.nodeSelection = val
    },
    async createSwarm () {
      const error = await createSwarm(this.currentEndpoint)
      if (!error) {
        this.$message.success('集群创建成功')
        this.fetchSwarmInfo()
      } else {
        this.$message.error(error)
      }
    },
    async leaveSwarm () {
      let errormsg = ''
      this.nodeSelection.forEach(async (node) => {
        const error = await leaveSwarm(node.address)
        if (error) {
          errormsg += error
        }
      })
      if (errormsg === '') {
        this.$message.success('集群节点删除成功')
        this.fetchSwarmInfo()
      } else {
        this.$message.error(errormsg)
      }
    },
    async joinSwarm () {
      const role = this.joinFormInfo.isManager ? 'Manager' : 'Worker'
      const JoinToken = this.swarmInfo.JoinTokens[role]
      console.log('joinSwarm', this.currentEndpoint.ip, JoinToken, this.managerNodes[0].address)
      const error = await joinSwarm(this.joinFormInfo.ip, JoinToken, this.managerNodes[0].address)
      if (!error) {
        this.$message.success('节点加入集群')
        this.fetchSwarmInfo()
        this.dialogVisible = false
      } else {
        this.$message.error(error)
      }
    }
  }
}
</script>

<style lang="scss">
  .nodes-list {
    .sub-title {
      margin-bottom: 20px;
    }
    .action-bar {
      margin-bottom: 12px;
    }
  }
</style>
