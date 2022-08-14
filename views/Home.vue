<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "Home",
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
