import {fetch, timeData} from '@/utils'
export function getData (allData) {
  const data = {}
  data.startTime = allData.startTime || '19700107'
  data.endTime = allData.endTime || '19700107'
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
