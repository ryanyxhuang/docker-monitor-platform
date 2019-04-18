<template>
  <div class="container-log">
    <section class="card">
      <h3 class="sub-title">容器日志</h3>
      <el-date-picker
        v-model="datetimeRange"
        type="datetimerange"
        start-placeholder="起始日期"
        end-placeholder="结束日期"
        @change="handleDatetimeChange"
        :default-time="['12:00:00']">
      </el-date-picker>
      <el-table
        :data="logList"
        style="width: 100%;margin-top: 8px">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" class="table-expand">
              <el-form-item v-for="(value, key) in props.row" :key="key" :label="key" label-width="280px">
                <span>{{ value }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="ID"
          prop="_id">
        </el-table-column>
        <el-table-column
          label="Index"
          prop="_index">
        </el-table-column>
        <el-table-column
          label="Timestamp">
          <template slot-scope="scope">
            {{scope.row['_source.@timestamp'] | timeFormat }}
          </template>
        </el-table-column>
      </el-table>
    </section>
  </div>
</template>

<script>
import {fetchLogListByContainer} from '@/api/elastic'
import {format as timeFormat} from '@/util/time'

export default {
  components: {},
  props: {},
  data () {
    return {
      logList: null,
      datetimeRange: null
    }
  },
  computed: {},
  filters: {
    timeFormat: function (value) {
      let date = value
      if (typeof value === 'string') {
        date = new Date(value)
      }
      return timeFormat(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  async mounted () {
    this.logList = await fetchLogListByContainer([{term: {container_id: this.$route.params.id}}], true)
  },
  methods: {
    async handleDatetimeChange () {
      if (!this.datetimeRange) {
        this.logList = await fetchLogListByContainer([{term: {container_id: this.$route.params.id}}], true)
      } else {
        this.logList = await fetchLogListByContainer([
          {term: {container_id: this.$route.params.id}},
          {range: {'@timestamp': {
            lt: this.datetimeRange[1],
            gte: this.datetimeRange[0]}}
          }
        ], true)
      }
    }
  }
}
</script>

<style lang="scss">
  .container-log {
    .sub-title {
      margin-bottom: 20px;
    }
  }

  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 100%;
  }
</style>
