export function convertTimeStamp (ts) {
  let date
  if (!ts) {
    date = new Date()
  } else {
    date = new Date(ts)
  }
  const Y = date.getFullYear()
  const M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
  const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  const h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return `${Y}-${M}-${D} ${h}:${m}:${s}`
}

export function getFormatedDate (ts) {
  return convertTimeStamp(ts).split(' ')[0]
}

export function getLastNDay (n) {
  return getFormatedDate(new Date().getTime() - n * 3600 * 24 * 1000).replace(/-/g, '/')
}
