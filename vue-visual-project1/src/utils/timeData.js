export function timeData (startTime, endTime, timeType) {
  let timeMultiple = 1

  if (timeType === 'year') {
    timeMultiple = 365
  } else if (timeType === 'month') {
    timeMultiple = 30
  } else {
    timeMultiple = 1
  }
  let timeLong = endTime - startTime
  timeLong = Math.ceil(timeLong / (24 * 3600 * 1000 * timeMultiple))
  console.log(timeLong * timeMultiple, timeMultiple)
  return timeLong < 12 ? timeLong * timeMultiple
                       : 12 * timeMultiple
}
