<template>
  <el-container style="height: 100%">
    <el-aside width="auto">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import CommonAside from "../src/components/CommonAside.vue";
export default {
  name: "Main",
  components: {
    CommonAside,
  },
  data() {
    return {};
  },
};
</script>
<style>
.el-header {
  background-color: #fff;
}
.el-main {
  padding-top: 0;
}
</style>
