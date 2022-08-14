import Mock from 'mockjs'
import homeApi from './mockServeData/home'

Mock.mock('/home/getData', homeApi.getStatisticalData)