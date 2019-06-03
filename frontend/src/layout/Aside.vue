<template>
  <aside>
    <el-menu
      default-active="home"
      class="aside-menu"
      background-color="#484D51"
      text-color="#fff"
      :router="false"
      @select="handleMenuRouter"
      active-text-color="#5296CF">
      <el-menu-item index="home">
        <i class="el-icon-location-outline"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="containersList">
        <i class="el-icon-more-outline"></i>
        <span slot="title">Containers</span>
      </el-menu-item>
      <el-menu-item index="servicesList">
        <i class="el-icon-tickets"></i>
        <span slot="title">Services</span>
      </el-menu-item>
      <el-menu-item index="stacksList">
        <i class="el-icon-document"></i>
        <span slot="title">Stacks</span>
      </el-menu-item>
      <el-menu-item index="nodesList">
        <i class="el-icon-news"></i>
        <span slot="title">Swarm</span>
      </el-menu-item>
      <el-menu-item index="config">
        <i class="el-icon-view"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<script>
export default {
  methods: {
    handleMenuRouter (index) {
      console.log(index)
      this.$router.push({name: index})
    }
  }
}
</script>

<style lang="scss">
  aside {
    /*height: 100%;*/
    width: 280px;
    background-color: rgb(72, 77, 81);
  }
  .aside-menu {
    width: 100%;
    height: 100%;
    .el-menu-item {
      text-align: left;
    }
  }
</style>
