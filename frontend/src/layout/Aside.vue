<template>
  <aside>
    <el-menu
      default-active="home"
      class="aside-menu"
      background-color="#484D51"
      text-color="#fff"
      :router="true"
      active-text-color="#5296CF">
      <el-menu-item index="home">
        <i class="el-icon-location-outline"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="containers">
        <i class="el-icon-more-outline"></i>
        <span slot="title">Containers</span>
      </el-menu-item>
      <el-menu-item index="services">
        <i class="el-icon-tickets"></i>
        <span slot="title">Services</span>
      </el-menu-item>
      <el-menu-item index="stacks">
        <i class="el-icon-document"></i>
        <span slot="title">Stacks</span>
      </el-menu-item>
      <el-menu-item index="swarm">
        <i class="el-icon-news"></i>
        <span slot="title">Swarm</span>
      </el-menu-item>
    </el-menu>
  </aside>
</template>

<style lang="scss">
  aside {
    height: 100%;
  }
  .aside-menu {
    width: 240px;
    height: 100%;
    .el-menu-item {
      text-align: left;
    }
  }
</style>
