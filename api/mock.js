import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'

Mock.mock('/home/getData', homeApi.getStatisticalData)
Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)