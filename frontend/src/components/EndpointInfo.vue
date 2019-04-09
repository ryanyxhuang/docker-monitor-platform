<template>
  <div class="endpoint-info">
    <section class="card">
      <h3 class="sub-title">当前主机信息</h3>
      <div class="endpoint-info-main">
        <ul class="endpoint-info-base">
          <li v-for="(value, name) in endpointInfo" :key="name">
            <div class="name">{{name}}</div>
            <div class="value">{{value}}</div>
          </li>
        </ul>
        <ul class="endpoint-info-count">
          <li><div>1</div>Stacks</li>
          <li><div>9</div>Services</li>
          <li><div>9</div>Containers</li>
          <li><div>8</div>Images</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import Info from '@/components/BaseInfo'

export default {
  props: ['endpointInfo'],
  components: {Info},
  methods: {}
}
</script>

<style lang="scss">
  .endpoint-info {
    .sub-title {
      margin-bottom: 20px;
    }
    &-main {
      display: flex;
      li {
        background: #F5F5F6;
        border: 1px solid #F5F5F6;
      }
    }
    &-base {
      flex: 3;
      margin-bottom: -8px;
      li {
        height: 36px;
        line-height: 36px;
        margin-bottom: 8px;
        .name, .value{
          display: inline-block;
        }
        .name {
          width: 90px;
          padding-left: 26px;
          font-weight: 600;
        }
        .value {
          margin-left: 16px;
          color: #474646;
        }
      }
    }
    &-count {
      width: 400px;
      margin-left: 16px;
      display: flex;
      li {
        flex: 1;
        text-align: center;
        margin-left: 12px;
      }
      div {
        font-weight: 600;
        color: #C6D0D4;
        font-size: 32px;
        margin-top: 20px;
      }
    }
  }
</style>
