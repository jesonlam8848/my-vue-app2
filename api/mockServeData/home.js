// mock数据模拟
import Mock from 'mockjs'

// 图表数据
let List = [];
// 7天前到今天的年-月-日
var day1 = new Date();
day1.setTime(day1.getTime() - 144 * 60 * 60 * 1000);
var s1 = (day1.getMonth() + 1) + "-" + day1.getDate();

var day2 = new Date();
day2.setTime(day2.getTime() - 120 * 60 * 60 * 1000);
var s2 = (day2.getMonth() + 1) + "-" + day2.getDate();

var day3 = new Date();
day3.setTime(day3.getTime() - 96 * 60 * 60 * 1000);
var s3 = (day3.getMonth() + 1) + "-" + day3.getDate();

var day4 = new Date();
day4.setTime(day4.getTime() - 72 * 60 * 60 * 1000);
var s4 = (day4.getMonth() + 1) + "-" + day4.getDate();

var day5 = new Date();
day5.setTime(day5.getTime() - 48 * 60 * 60 * 1000);
var s5 = (day5.getMonth() + 1) + "-" + day5.getDate();

var day6 = new Date();
day6.setTime(day6.getTime() - 24 * 60 * 60 * 1000);
var s6 = (day6.getMonth() + 1) + "-" + day6.getDate();

var day7 = new Date();
day7.setTime(day7.getTime());
var s7 = (day7.getMonth() + 1) + "-" + day7.getDate();
export default {
  getStatisticalData: () => {
    //Mock.Random.float 产生随机数100到8000之间 保留小数 最小0位 最大0位
    // 折线图
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          密切接触者: Mock.Random.float(1000, 2000, 0, 0),
          次密切接触者: Mock.Random.float(3000, 3500, 0, 0),
          封控区: Mock.Random.float(1000, 2000, 0, 0),
          管控区: Mock.Random.float(2000, 3000, 0, 0),
          隔离区: Mock.Random.float(1000, 2000, 0, 0),
          防范区: Mock.Random.float(1000, 2000, 0, 0)
        })
      )
    }
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: '华北',
            value: Mock.Random.float(25000, 30000, 0, 0),
          },
          {
            name: '华南',
            value: Mock.Random.float(25000, 30000, 0, 0),
          },
          {
            name: '华西',
            value: Mock.Random.float(8000, 10000, 0, 0),
          },
          {
            name: '华东',
            value: Mock.Random.float(25000, 30000, 0, 0),
          },
          {
            name: '港澳',
            value: Mock.Random.float(6000, 8000, 0, 0),
          },
          {
            name: '台湾',
            value: Mock.Random.float(6000, 8000, 0, 0),
          }
        ],
        // 柱状图
        userData: [
          {
            date: 'Mon',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Tues',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Wed',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Thur',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Fri',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Sat',
            new: Mock.Random.float(150, 200, 0, 0),
            active: Mock.Random.float(50, 80, 0, 0)
          },
          {
            date: 'Sun',
            new: Mock.Random.float(150, 200, 0, 0),
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
            name: '国药中生',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '北京科兴',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '智飞生物',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '康希诺',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '深圳康泰',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          },
          {
            name: '辉瑞',
            todayBuy: Mock.Random.float(0,50,0,0),
            monthBuy: Mock.Random.float(500,1000,0,0),
            totalBuy: Mock.Random.float(2000,3000,0,0)
          }
        ]
      }
    }
  }
}
