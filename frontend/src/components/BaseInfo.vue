<template>
  <ul class="base-info">
    <li v-for="(value, name) in info" :key="name">
      <div class="name">{{name}}</div>
      <div class="value">{{value}}</div>
    </li>
  </ul>
</template>

<script>

export default {
  props: ['info'],
  computed: {},
  methods: {}
}
</script>

<style lang="scss">
  .base-info {
    .name {}
    .value {}
  }
</style>
