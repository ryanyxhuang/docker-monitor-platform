<template>
  <div class="stack-analysis">
    <section class="card">
      <h3 class="sub-title">依赖分析</h3>
      <el-button v-if="!sourceDockerCompose"
                 type="primary"
                 style="margin-bottom: 12px"
                 @click="createDockerCompose"
                 :disabled="!code">
        创建Docker-Compose
      </el-button>
      <el-button v-if="sourceDockerCompose"
                 type="primary"
                 style="margin-bottom: 12px"
                 @click="updateDockerCompose"
                 :disabled="!ymlUpdatable">
        更新Docker-Compose
      </el-button>
      <div class="depend-analysis">
        <div class="depend-code-wraper">
          <codemirror class="depend-code" v-model="code" :options="cmOptions"></codemirror>
        </div>
        <div>
        </div>
        <div class="depend-chart-wraper">
          <series-graph :graphData="graphData"></series-graph>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
/* eslint-disable indent */

import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/mode/yaml/yaml.js'
import jsyaml from 'js-yaml'
import SeriesGraph from '@/components/SeriesGraph'
import {fetchDockerCompose, updateDockerCompose, createDockerCompose} from '@/api/compose'

export default {
  components: {
    codemirror,
    SeriesGraph
  },
  props: {},
  data () {
    return {
      sourceDockerCompose: null,
      code: '',
      cmOptions: {
        tabSize: 2,
        mode: 'yaml',
        theme: 'base16-dark',
        styleActiveLine: true,
        showCursorWhenSelecting: true,
        lineNumbers: true,
        line: true
      }
    }
  },
  computed: {
    initYmlObject () {
      return jsyaml.load(this.sourceDockerCompose.content)
    },
    ymlUpdatable () {
      return this.ymlObject && (!this._.isEqual(this.initYmlObject, this.ymlObject))
    },
    ymlObject () {
      try {
        return jsyaml.load(this.code)
      } catch (e) {
        return null
      }
    },
    services () {
      return this.ymlObject && this.ymlObject.services
    },
    graphData () {
      const nodes = []
      const links = []
      if (this.services) {
        for (let serviceId in this.services) {
          const service = this.services[serviceId]
          nodes.push({
            id: serviceId,
            name: serviceId,
            value: 50,
            symbolSize: 50
          })
          if (service && Array.isArray(service.depends_on)) {
            service.depends_on.forEach((dependencyId) => {
              links.push({
                source: serviceId,
                target: dependencyId
              })
            })
          }
        }
      }
      return {
        nodes,
        links
      }
    },
    stackId () {
      return this.$route.params.id
    }
  },
  async mounted () {
    this.sourceDockerCompose = await fetchDockerCompose(this.stackId)
    if (this.sourceDockerCompose) {
      this.code = this.sourceDockerCompose.content
    }
  },
  methods: {
    async createDockerCompose () {
      const dockerCompose = {
        id: this.stackId,
        name: this.stackId,
        stackId: this.stackId,
        isStackDependOn: false,
        content: this.code
      }
      const error = await createDockerCompose(dockerCompose)
      if (error) {
        this.$message.error(error)
      } else {
        this.$message.success('DockerCompose创建成功')
        this.sourceDockerCompose = dockerCompose
      }
    },
    async updateDockerCompose () {
      const dockerCompose = this.sourceDockerCompose
      if (!this.ymlObject) {
        return
      }
      dockerCompose.content = this.code
      const error = await updateDockerCompose(dockerCompose)
      if (error) {
        this.$message.error(error)
      } else {
        this.$message.success('DockerCompose更新成功')
        this.sourceDockerCompose = dockerCompose
      }
    }
  }
}
</script>

<style lang="scss">
  .stack-analysis {
    .sub-title {
      margin-bottom: 20px;
    }
    .depend-analysis {
      /*height: 420px;*/
      display: flex;
      .depend-code-wraper {
        width: 43%;
        /*height: 100%;*/
        position: relative;
        /*margin-right: 20px;*/
      }
      .depend-code {
        /*height: 100%;*/
      }
      .depend-chart-wraper {
        flex: 1;
      }
      .depend-chart {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
      }
    }
  }

  .CodeMirror {
    height: 360px;
  }

  .CodeMirror-hscrollbar {
    opacity: 0;
  }
</style>
