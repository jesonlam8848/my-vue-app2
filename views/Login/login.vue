<template>
  <el-form
    :model="form"
    status-icon
    :rules="rules"
    ref="form"
    label-width="100px"
    class="login-container"
  >
    <div class="title">疫情监控系统</div>
    <!-- <div class="myGithub">
      <a href="https://github.com/jesonlam8848/my-vue-app2" target="_blank"
        ><img
          title="点击访问"
          src="../../src/assets/images/github.png"
          style="vertical-align: middle"
        /><span>本项目源码仓库</span></a
      >
    </div> -->
    <h2>~第一个账号功能更完善呦~</h2>
    <h3>用户名：sudo&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;密码：111</h3>
    <h3 class="admin">用户名：admin&nbsp;&nbsp;&nbsp;&nbsp;密码：222</h3>
    <el-form-item
      label="用户名"
      label-width="65px"
      prop="username"
      class="username"
    >
      <el-input
        type="input"
        v-model="form.username"
        autocomplete="off"
        placeholder="请输入账号"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="65px" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        autocomplete="off"
        placeholder="请输入密码"
      ></el-input>
    </el-form-item>
    <el-form-item class="login_submit">
      <el-button type="primary" @click="login" class="login_submit"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>
<script>
// import Mock from "mockjs";
import { getMenu } from "../../api/data";
export default {
  name: "login",
  data() {
    return {
      form: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            message: "用户名长度不能小于3位",
            trigger: "blur",
          },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    login() {
      getMenu(this.form).then(({ data: res }) => {
        console.log(res, "res");
        if (res.code === 20000) {
          this.$store.commit("clearMenu");
          this.$store.commit("setMenu", res.data.menu);
          this.$store.commit("setToken", res.data.token);
          this.$store.commit("addMenu", this.$router);
          this.$router.push({ name: "home" });
        } else {
          this.$message.warning(res.data.message);
        }
      });
      // // 由于没后端，通过mock模拟随即拿到token
      // const token = Mock.random.guid();
      // this.$store.commit("setToken", token);
      // this.$router.push({ name: "home" });
    },
  },
  mounted() {
    // aixos请求
    // this.$http
    //   .post("http://49.232.174.49:9988/conf/info/comm", {
    //     type: "我是type",
    //     name: "张三",
    //     value: "我是value",
    //   })
    //   .then(function (response) {
    //     // 处理成功情况
    //     console.log(response, "post成功");
    //   })
    //   .catch(function (error) {
    //     // 处理错误情况
    //     console.log(error, "post失败");
    //   })
    //   .then(function () {
    //     // 总是会执行
    //   });
    this.$http
      .get("http://49.232.174.49:9988/conf/info/template/")
      .then(function (response) {
        // 处理成功情况
        console.log(response, "get成功");
      })
      .catch(function (error) {
        // 处理错误情况
        console.log(error, "get失败");
      })
      .then(function () {
        // 总是会执行
      });
  },
};
</script>
<style scoped>
.title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 25px;
  color: blueviolet;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-container h2 {
  color: red;
  text-align: center;
}
.login-container h3 {
  color: green;
  text-align: center;
  margin: 10px auto;
}
.login-container a {
  text-decoration: underline;
  color: blue;
}
.login-container img {
  width: 20px;
  margin-right: 5px;
  /* margin-bottom: 10px; */
}
.login-container .myGithub {
  margin-bottom: 10px;
  text-align: center;
}
.login_submit {
  margin: 10px auto 0px auto;
}
</style>
