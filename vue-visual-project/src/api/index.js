import {fetch, timeData} from '@/utils'
export function getData (allData) {
  const data = {}
  data.startTime = allData.startTime
  data.endTime = allData.endTime
  data.city = allData.city
  data.timeType = allData.timeType
  timeData(data.startTime, data.endTime, allData.timeType)
  return fetch({
    url: '',
    method: 'get',
    data: {}
  })
}
