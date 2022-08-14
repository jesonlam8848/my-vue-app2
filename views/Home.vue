<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from '../src/components/CommonAside.vue';
export default {
  name: "Home",
  components: {
    CommonAside
  },
  data() {
    return {};
  },
};
</script>
<style>
.el-header {
    background-color: #333;
}
.el-main {
    padding-top: 0;
}
</style>
