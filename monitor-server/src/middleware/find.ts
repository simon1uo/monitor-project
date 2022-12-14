import { queryApi } from '../config/influx'
import { ApiResponse } from '../utils/response'

export default async function find(query: string) {
  return await new Promise((resolve, reject) => {
    let res: any = null
    let arr: any[] = []

    queryApi.queryRows(query, {
      next(row: any, tableMeta: { toObject: (arg0: any) => any }) {
        const o = tableMeta.toObject(row)
        arr.push(o)
        if (arr.length > 0) {
          res = new ApiResponse({
            code: 200,
            msg: '数据查询成功',
            data: {
              status: true,
              response: arr
            }
          })
        }
      },
      error() {
        res = new ApiResponse({
          code: 500,
          msg: '数据查询失败',
          data: {
            status: false
          }
        })
        reject(res)
      },
      complete() {
        if (arr.length === 0) {
          res = new ApiResponse({
            code: 0,
            msg: '查无此数据',
            data: {
              status: false
            }
          })
        }
        resolve(res)
      }
    })
  })
}
