<template>
  <el-row class="home" :gutter="20">
    <!-- 首页左侧 -->
    <el-col :span="8" style="margin-top: 20px" :xs="{ span: 24, offset: 0 }">
      <!-- 首页左上 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
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
    <el-col style="margin-top: 20px" :span="16" :xs="{ span: 24, offset: 0 }">
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
            <p class="num">￥{{ item.value }}</p>
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
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <echart :chartData="echartData.user" style="height: 240px" />
        </el-card>
        <!-- 饼状图 -->
        <el-card style="height: 260px">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echart
            :chartData="echartData.video"
            :isAxisChart="false"
            style="height: 240px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
import Echart from "../../src/components/ECharts.vue";

export default {
  name: "home",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../src/assets/images/user.png"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总共购买",
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
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
            name: "新增用户",
            data: data.userData.map((item) => item.new),
            type: "bar",
          },
          {
            name: "活跃用户",
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
<style>
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
