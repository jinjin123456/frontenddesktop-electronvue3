// import http from './http/index'
import { resultMap } from '@/types'
import Mock from 'mockjs'
/**
 * @description: 获取模拟数据
 * @param {type object} params
 */
export const getMockData = (params?: object) => {
  console.log(params)
  // return http.get(CONSTANT.PREFIX + '/right/tenant/company/detail', params)
  return new Promise<resultMap>((resolve) => {
    resolve(
      Mock.mock({
        code: '000000',
        message: '',
        data: {
          'records|0-25': [
            {
              id: '@id',
              roleName: '@cname',
              roleDetail: '@cparagraph(1,2)',
              founder: '@cparagraph(1,2)',
              updateTime: '@datetime'
            }
          ],
          total: 45
        }
      })
    )
  })
}
