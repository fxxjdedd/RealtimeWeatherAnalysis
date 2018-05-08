import {fetch, timeData} from '@/utils'
import moment from 'moment'
export function getData (allData) {
  const data = {}
  if (!allData.startTime) {
    allData.startTime = '19700101'
  }
  if (!allData.endTime) {
    allData.endTime = '19700107'
  }
  data.startTime = moment(allData.startTime, 'YYYYMMDD').format('YYYYMMDD')
  data.endTime = moment(allData.endTime, 'YYYYMMDD').format('YYYYMMDD')
  data.city = allData.city || '济南'
  data.interval = timeData(data.startTime, data.endTime, allData.timeType) || 1

  return fetch({
    url: '/api/query',
    method: 'get',
    params: data
  })
}
// export function getData (allData) {
//   return fetch({
//     url: '/api/get?index=-1&num=7',
//     method: 'get'
//   })
// }
