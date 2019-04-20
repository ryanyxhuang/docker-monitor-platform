<template>
  <div class="stack-analysis">
    <section class="card">
      <h3 class="sub-title">依赖分析</h3>
      <div class="depend-analysis">
        <div class="depend-code-wraper">
          <codemirror class="depend-code" v-model="code" :options="cmOptions"></codemirror>
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

export default {
  components: {
    codemirror,
    SeriesGraph
  },
  props: {},
  data () {
    return {
      code: 'version: \'2\'\n' +
      'services:\n' +
      '  web:\n' +
      '    build: .\n' +
      '    ports:\n' +
      '     - "5000:5000"\n' +
      '    volumes:\n' +
      '     - .:/code\n' +
      '    depends_on:\n' +
      '     - redis\n' +
      '  redis:\n' +
      '    image: redis',
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
    services () {
      try {
        let ymlObject = jsyaml.load(this.code)
        return ymlObject.services
      } catch (e) {
        return null
      }
    },
    graphData () {
      const nodes = []
      const links = []
      if (this.services) {
        for (let serviceId in this.services) {
          const service = this.services[serviceId]
          console.log(serviceId)
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
    }
  },
  mounted () {
  },
  methods: {
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
        width: 36%;
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
</style>
