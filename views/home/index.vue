<template>
  <el-row class="home" :gutter="20">
    <!-- 首页左侧 -->
    <el-col :span="11" style="margin-top: 20px" :xs="{ span: 24, offset: 0 }">
      <!-- 首页左上 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">{{ register }}</p>
            <p class="access">登陆者</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            本次登录时间：<span>{{ currentdate }}</span>
          </p>
          <p>
            <a
              href="https://github.com/jesonlam8848/my-vue-app2"
              target="_blank"
              style="
                text-decoration: underline;
                text-decoration-color: blue;
                margin-left: 20px;
              "
              ><img
                style="vertical-align: middle; width: 45px"
                src="../../src/assets/images/github.png"
                title="点击访问"
              /><span style="margin-left: 5px; font-size: 20px; color: blue"
                >本项目源码仓库</span
              ></a
            >
          </p>
        </div>
      </el-card>
      <!-- 首页左下-->
      <el-card style="margin-top: 20px; height: 460px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 首页右侧 -->
    <el-col style="margin-top: 20px" :span="13" :xs="{ span: 24, offset: 0 }">
      <!-- 首页右上 -->
      <div class="num">
        <el-card
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- echarts折线图 -->
      <el-card style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :chartData="echartData.order" style="height: 280px" />
      </el-card>
      <!-- 柱状图和饼状图 -->
      <!-- <el-row :gutter="0"> -->
      <!-- <div class="graph"> -->
      <!-- 柱状图 -->
      <el-row :gutter="0">
        <el-col :span="12" class="userEcharts" :xs="{ span: 24, offset: 0 }">
          <el-card style="height: 260px">
            <!-- <div style="height: 240px" ref="userEcharts"></div> -->
            <echart :chartData="echartData.user" style="height: 240px" />
          </el-card>
        </el-col>

        <el-col :span="12" class="video" :xs="{ span: 24, offset: 0 }">
          <!-- 饼状图 -->
          <el-card style="height: 260px">
            <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
            <echart
              :chartData="echartData.video"
              :isAxisChart="false"
              style="height: 240px"
            />
          </el-card>
        </el-col>
      </el-row>
      <!-- </div> -->
      <!-- </el-row> -->
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
import Echart from "../../src/components/ECharts.vue";
import Mock from "mockjs";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      register: Mock.Random.float(1000,2000,0,0)+'号',
      currentdate:
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate(),
      userImg: require("../../src/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "疫苗品牌",
        todayBuy: "第一针",
        monthBuy: "第二针",
        totalBuy: "第三针",
      },
      countData: [
        {
          name: "现确诊",
          value: Mock.Random.float(2000, 2500, 0, 0),
          icon: "circle-check",
          color: "#ff9900",
        },
        {
          name: "现存疑似",
          value: Mock.Random.float(4000, 5000, 0, 0),
          icon: "first-aid-kit",
          color: "#ffcc99",
        },
        {
          name: "现存重症",
          value: Mock.Random.float(700, 1000, 0, 0),
          icon: "star-on",
          color: "#996600",
        },
        {
          name: "累计确诊",
          value: Mock.Random.float(80000, 100000, 0, 0),
          icon: "success",
          color: "#cc0000",
        },
        {
          name: "累计死亡",
          value: Mock.Random.float(4000, 6000, 0, 0),
          icon: "user",
          color: "#666666",
        },
        {
          name: "累计治愈",
          value: Mock.Random.float(80000, 100000, 0, 0),
          icon: "user-solid",
          color: "#3399cc",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   legend: {
        //     data: keyArray,
        //   },
        //   series,
        // };
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;
        // const E = echarts.init(this.$refs.echarts);
        // E.setOption(option);

        // 用户图
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: "#333",
        //     },
        //   },
        //   grid: {
        //     left: "20%",
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: "axis",
        //   },
        //   xAxis: {
        //     type: "category", // 类目轴
        //     data: data.userData.map((item) => item.date),
        //     axisLine: {
        //       lineStyle: {
        //         color: "#17b3a3",
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: "#333",
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: "value",
        //       axisLine: {
        //         lineStyle: {
        //           color: "#17b3a3",
        //         },
        //       },
        //     },
        //   ],
        //   color: ["#2ec7c9", "#b6a2de"],
        //   series: [
        //     {
        //       name: "新增用户",
        //       data: data.userData.map((item) => item.new),
        //       type: "bar",
        //     },
        //     {
        //       name: "活跃用户",
        //       data: data.userData.map((item) => item.active),
        //       type: "bar",
        //     },
        //   ],
        // };

        this.echartData.user.xData = data.userData.map((item) => item.date);
        this.echartData.user.series = [
          {
            name: "康复患者",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "新增患者",
            data: data.userData.map((item) => item.active),
            type: "bar",
          },
        ];
        // const U = echarts.init(this.$refs.userEcharts);
        // U.setOption(userOption);
        // 饼图
        // const videoOption = {
        //   tooltip: {
        //     trigger: "item",
        //   },
        //   color: [
        //     "#0f78f4",
        //     "#dd536b",
        //     "#9462e5",
        //     "#a6a6a6",
        //     "#e1bb22",
        //     "#39c362",
        //     "#3ed1cf",
        //   ],
        //   series: [
        //     {
        //       data: data.videoData,
        //       type: "pie",
        //     },
        //   ],
        // };
        // const V = echarts.init(this.$refs.videoEcharts);
        // V.setOption(videoOption);

        this.echartData.video.series = [
          {
            data: data.videoData,
            type: "pie",
          },
        ];
      }
      console.log(res);
    });
  },
};
</script>
<!-- 自定义了样式 -->
<style scoped>
.home .num .icon {
  width: 35px;
}
.home .num .detail .num {
  font-size: 10px;
}
.home .num .detail .txt {
  font-size: 10px;
}
</style>
