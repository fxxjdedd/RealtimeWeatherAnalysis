import {fetch, timeData} from '@/utils'
// export function getData (allData) {
//   const data = {}
//   data.startTime = allData.startTime
//   data.endTime = allData.endTime
//   data.city = escape(allData.city)
//   data.interval = timeData(data.startTime, data.endTime, allData.timeType)
//   return fetch({
//     url: '/api/query',
//     method: 'get',
//     params: data
//   })
// }
export function getData (allData) {
  return fetch({
    url: '/api/get?index=-1&num=7',
    method: 'get'
  })
}
