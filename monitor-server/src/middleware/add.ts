import { Point } from '@influxdata/influxdb-client'
import coBody from 'co-body'
import { clientDB, INFLUX_ORG } from '../config/influx'
import { ApiResponse } from '../utils/response'

export default async function add(paramObj: {
  bucket: string
  request: object
}) {
  const { bucket, request } = paramObj

  try {
    const params = await coBody.json(request)
    const { cookie, data } = params
    // console.log('data', data)
    const keyArr = Object.keys(data)
    const writeApi = clientDB.getWriteApi(INFLUX_ORG, bucket)
    writeApi.useDefaultTags({ host: 'host1' })

    const point = new Point(cookie).tag('sensor_id', 'TLM010')
    keyArr.forEach((key: string) => {
      let type = typeof data[key]
      if (type === 'number') {
        type = Number.isInteger(data[key]) === true ? 'number' : 'bigint'
      }
      console.log('type2', type, data[key])
      switch (type) {
        case 'string':
          point.stringField(key, data[key])
          break
        case 'number':
          point.intField(key, data[key])
          break
        case 'bigint':
          point.floatField(key, data[key])
          break
        case 'boolean':
          point.booleanField(key, data[key])
          break
        // case 'object':
        //     point.stringField(key, data[key]);
        //     break;
      }
    })
    writeApi.writePoint(point)
    await writeApi.close()
    console.log('上报成功', bucket)

    return new ApiResponse({
      code: 200,
      msg: '数据写入成功',
      data: {
        status: true
      }
    })
  } catch (err) {
    return new ApiResponse({
      code: 500,
      msg: '数据写入失败',
      data: {
        status: false
      }
    })
  }
}
