<template>
    <div>
        <div ref="mapEcharts" class="map-echart"></div>
    </div>
  
</template>

<script>
import * as echarts from 'echarts'
import axios from 'axios'
import Mock from 'mockjs'

export default {
  name: "Map",
  data() {
    return {
      timer: null,
      seriesData: [
        {name: '广东省', value: Mock.Random.float(500,1000,0,0)},
        {name: '北京市', value: Mock.Random.float(500,1000,0,0)},
        {name: '河南省', value: Mock.Random.float(500,1000,0,0)},
        {name: '重庆市', value: Mock.Random.float(500,1000,0,0)},
        {name: '台湾省', value: Mock.Random.float(500,1000,0,0)},
        {name: '四川省', value: Mock.Random.float(200,400,0,0)},
        {name: '内蒙古自治区', value: Mock.Random.float(200,400,0,0)},
        {name: '云南省', value: Mock.Random.float(200,400,0,0)},
        {name: '浙江省', value: Mock.Random.float(200,400,0,0)},
        {name: '山西省', value: Mock.Random.float(200,400,0,0)},
        {name: '福建省', value: Mock.Random.float(200,400,0,0)},
        {name: '新疆维吾尔自治区', value: Mock.Random.float(100,200,0,0)},
        {name: '青海省', value: Mock.Random.float(100,200,0,0)},
        {name: '西藏自治区', value: Mock.Random.float(100,200,0,0)},
        {name: '甘肃省', value: Mock.Random.float(100,200,0,0)},
        {name: '陕西省', value: Mock.Random.float(100,200,0,0)},
        {name: '湖北省', value: Mock.Random.float(100,200,0,0)},
        {name: '贵州省', value: Mock.Random.float(100,200,0,0)},
        {name: '湖南省', value: Mock.Random.float(100,200,0,0)},
        {name: '湖南省', value: Mock.Random.float(100,200,0,0)},
        {name: '安徽省', value: Mock.Random.float(100,200,0,0)},
        {name: '山东省', value: Mock.Random.float(100,200,0,0)},
        {name: '河北省', value: Mock.Random.float(100,200,0,0)},
        {name: '天津市', value: Mock.Random.float(100,200,0,0)},
        {name: '辽宁省', value: Mock.Random.float(100,200,0,0)},
        {name: '黑龙江省', value: Mock.Random.float(100,200,0,0)},
        {name: '海南省', value: Mock.Random.float(100,200,0,0)},
        {name: '宁夏回族自治区', value: Mock.Random.float(0,50,0,0)},
        {name: '广西壮族自治区', value: Mock.Random.float(0,50,0,0)},
        {name: '江西省', value: Mock.Random.float(0,50,0,0)},
        {name: '吉林省', value: Mock.Random.float(0,50,0,0)},
        
      ],
      map: null
    }
    
  },
  created() {
    
  },
  mounted(){
      this.initMapEcharts();
  },
  methods: {
    initMapEcharts() {
      // 获取地图数据
      // 将下载后的json文件放置/public目录下
      axios.get('/china.json').then(res => {
          console.log(res);
         // 使用数据注册地图
         echarts.registerMap('china', res.data)
          this.$nextTick(() => {
            // 初始化地图
            this.map = echarts.init(this.$refs['mapEcharts'])
            // 设置基础配置项
            const option = {
              // 标题
              title: {
                text:"中国地区新增",
                left: 'center',
                subtext: "下载链接",
                sublink: "http://datav.aliyun.com/tools/atlas/#&lat=30.772340792178525&lng=103.94573258937584&zoom=9.5"
              },
              // 悬浮窗
              tooltip: {
                trigger: 'item',
                formatter: function(params) {
                  return `${params.name}: ${params.value || 0}`

                }
              },
              // 图例
              visualMap: {
                min: 0,
                max: 1000,
                text: ['High', 'Low'],
                realtime: false,
                calculable: true,
                inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                }
              },
              // 要显示的散点数据
              series: [
                {
                  type: 'map',
                  map: 'china',
                  // 这是要显示的数据
                  data: this.seriesData,
                  // 自定义命名映射，不设置的话，label默认是使用 geoJson中的name名
                  // nameMap: {
                  //   '北京市': "北京重命名",
                  //   "天津市": '天津重命名'
                  // },
                },
                
              ]
            }
            // 将配置应用到地图上
            this.map.setOption(option)
            // 设置定时器，自动循环触发tooltip悬浮窗事件
            this.setTimer()
            let that = this;
            // 当鼠标在地图上时，停止自动tooltip事件
            this.map.on('mouseover', {series: 0,}, function(params) {
              console.log(params)
              that.clearTimer()
            })
            // 当鼠标移出地图后，再自动tooltip
            this.map.on('mouseout', {series: 0}, function(params) {
              console.log(params)
              that.setTimer()
            })
          })
      })
    },
    setTimer() {
      // 当前选中区域的下标
      let curIndex = -1;
      this.timer && clearInterval(this.timer)
      this.timer = setInterval(() => {
        const len = this.seriesData.length;
        // dispatchAction是主动去触发echarts事件，取消高亮当前的数据图形
        this.map.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: curIndex
        })
        // 下一个选中区域的下标
        curIndex = (curIndex + 1) % len;
        // 高亮下一个数据图形
        this.map.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: curIndex
        })
        // 显示tooltip
        this.map.dispatchAction({
          type: 'showTip',
          seriesIndex:0,
          dataIndex: curIndex
        })
      }, 1000)
    },
    clearTimer() {
      this.timer && clearInterval(this.timer)
    },
  },
  
  beforeDestroy() {
    this.clearTimer()
  }
}
</script>

<style>
.map-echart {
  height: 700px;
  /* width: -100px; */
}
</style>
