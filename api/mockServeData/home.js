// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = [];
// 7天前到今天的年-月-日
var day1 = new Date();
day1.setTime(day1.getTime() - 144 * 60 * 60 * 1000);
var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();

var day2 = new Date();
day2.setTime(day2.getTime() - 120 * 60 * 60 * 1000);
var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();

var day3 = new Date();
day3.setTime(day3.getTime() - 96 * 60 * 60 * 1000);
var s3 = day3.getFullYear() + "-" + (day3.getMonth() + 1) + "-" + day3.getDate();

var day4 = new Date();
day4.setTime(day4.getTime() - 72 * 60 * 60 * 1000);
var s4 = day4.getFullYear() + "-" + (day4.getMonth() + 1) + "-" + day4.getDate();

var day5 = new Date();
day5.setTime(day5.getTime() - 48 * 60 * 60 * 1000);
var s5 = day5.getFullYear() + "-" + (day5.getMonth() + 1) + "-" + day5.getDate();

var day6 = new Date();
day6.setTime(day6.getTime() - 24 * 60 * 60 * 1000);
var s6 = day6.getFullYear() + "-" + (day6.getMonth() + 1) + "-" + day6.getDate();

var day7 = new Date();
day7.setTime(day7.getTime());
var s7 = day7.getFullYear() + "-" + (day7.getMonth() + 1) + "-" + day7.getDate();
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 5000, 0, 0),
          oppo: Mock.Random.float(100, 5000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 10000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '小米',
            value: Mock.Random.float(100, 8000, 0, 0),
          },
          {
            name: '苹果',
            value: Mock.Random.float(100, 8000, 0, 0),
          },
          {
            name: 'vivo',
            value: Mock.Random.float(100, 8000, 0, 0),
          },
          {
            name: 'oppo',
            value: Mock.Random.float(100, 8000, 0, 0),
          },
          {
            name: '魅族',
            value: Mock.Random.float(100, 8000, 0, 0),
          },
          {
            name: '三星',
            value: Mock.Random.float(100, 8000, 0, 0),
          }
        ],
        // 柱状图
        userData: [
          {
            date: '周一',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周二',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周三',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周四',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周五',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周六',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: '周日',
            new: Mock.Random.float(0, 30, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          }
        ],
        // 折线图
        orderData: {
          date: [`${s1}`, `${s2}`, `${s3}`, `${s4}`, `${s5}`, `${s6}`, `${s7}`],
          data: List
        },
        tableData: [
          {
            name: 'oppo',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: 'vivo',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '苹果',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '小米',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '三星',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '魅族',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          }
        ]
      }
    }
  }
}
