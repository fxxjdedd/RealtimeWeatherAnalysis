import moment from 'moment'
export function timeData (startTime, endTime, timeType) {
  let timeMultiple = 1

  if (timeType === 'year') {
    timeMultiple = 365
    startTime = moment(startTime, 'YYYYMMDD').format('YYYY')
    endTime = moment(endTime, 'YYYYMMDD').format('YYYY')
  } else if (timeType === 'month') {
    timeMultiple = 30
    startTime = moment(startTime, 'YYYYMMDD').format('YYYYMM')
    endTime = moment(endTime, 'YYYYMMDD').format('YYYYMM')
  } else {
    timeMultiple = 1
  }
  let timeLong = endTime - startTime
  console.log(timeLong)
  // timeLong = Math.ceil(timeLong / timeMultiple)
  if (timeLong < 12) {
    return timeLong * timeMultiple
  } else if (timeLong < 24) {
    return parseInt(timeLong / 2) * timeMultiple
  } else if (timeLong < 36) {
    return parseInt(timeLong / 3) * timeMultiple
  } else {
    return parseInt(timeLong / 10) * timeMultiple
  }
}
