import moment from 'moment'
export function timeData (startTime, endTime, timeType) {
  let timeMultiple = 1

  if (timeType === 'year') {
    timeMultiple = 365
  } else if (timeType === 'month') {
    timeMultiple = 30
  } else {
    timeMultiple = 1
  }
  let timeLong = moment(endTime, 'YYYYMMDD').diff(moment(startTime, 'YYYYMMDD'), 'days')
  timeLong = Math.ceil(timeLong / timeMultiple)
  if (timeLong < 12) {
    return timeMultiple
  } else if (timeLong < 24) {
    return 2 * timeMultiple
  } else if (timeLong < 36) {
    return 3 * timeMultiple
  } else {
    return parseInt(timeLong / 10) * timeMultiple
  }
}
