<template>
  <div class="series-graph" id="seriesGraph" ref="seriesGraph"></div>
</template>

<script>
import echarts from 'echarts'

export default {
  props: ['graphData'],
  data () {
    return {
      chart: null,
      option: {
        tooltip: {},
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
          {
            name: 'Les Miserables',
            type: 'graph',
            layout: 'circular',
            data: this.graphData.nodes || [],
            links: this.graphData.links || [],
            roam: true,
            focusNodeAdjacency: true,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = [
                    '#BF2C33', '#63A1B5', '#D28065', '#93C9AE', '#27727B',
                    '#75A183', '#C98624', '#BCA29A', '#6E7470', '#304554',
                    '#4682B4', '#800000', '#BC8F8F', '#BDB76B', '#008B8B'
                  ]
                  return colorList[params.dataIndex]
                },
                borderColor: '#fff',
                borderWidth: 1,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.14)'
              }
            },
            label: {
              position: 'right',
              formatter: '{b}',
              show: true
            },
            edgeSymbol: ['none', 'arrow'],
            lineStyle: {
              color: 'source',
              curveness: 0.3,
              opacity: 0.5,
              width: 1.8
            },
            emphasis: {
              lineStyle: {
                width: 3
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    this.chart = echarts.init(this.$refs.seriesGraph)
    this.chart.setOption(this.option)
  },
  watch: {
    graphData (val) {
      const series = this.option.series[0]
      series.data = val.nodes || []
      series.links = val.links || []
      if (!this.chart) {
        this.chart = echarts.init(this.$refs.seriesGraph)
      }
      this.chart.setOption(this.option)
    }
  }
}
</script>

<style lang="scss">
.series-graph {
  width: 100%;
  height: 100%;
}
</style>
