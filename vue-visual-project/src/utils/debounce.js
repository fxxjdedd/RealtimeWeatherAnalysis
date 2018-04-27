import axios from 'axios'
import {remove} from 'lodash/array'
const sources = []
export default function getDebouncedRequest (instance) {
  return debounce((params = {}, url, cookie) => {
  // cancel是用来改善：如果ms设定为10ms，此时同时发起大量请求，由于ms过小，请求中的很多个还是会执行，这时候就要把老请求取消掉
  // 否则会出现：老请求较慢，新请求较快，导致老请求结果覆盖新请求
    remove(sources, s => s.source === null)
    sources.forEach(s => {
      if (s !== null && s.source !== null && s.status === 1) {
        s.status = 0
        s.source.cancel('cancel last req')
      }
    })
    const sc = {
      source: axios.CancelToken.source(),
      status: 1
    }
    sources.push(sc)
    return new Promise((resolve, reject) => {
      axios.get(url, {
        params: params
      }).then((res) => {
        sc.source = null
        resolve(res)
      }).catch((err) => {
        sc.source = null
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message)
        }
      })
    })
  }, 150) // 500ms内只能发起一次请求
}

function debounce (inner, ms = 0) {
  let timer = null
  let resolves = []
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // 这有在ms时间之外的inner函数才会执行,才会发起请求
      let result = inner(...args)
      // 当连续输入，watch会执行多次，也就会有多个函数栈，但是由于这里的设定，只有最后一个函数会resove结果，并且结果只有一个，因此不会乱套
      // 之前的所有resolve都会resolve相同的结果，这样就不会乱套了
      // 因此所有watch内的data变化都是同一个结果，这样就不会乱套
      resolves.forEach(r => r(result)) // 每个result都是Promise，Promise是关于dpRequest的请求
      resolves = []
    }, ms)
    return new Promise(resolve => resolves.push(resolve)) // 这里只是把resolve给push到数组里，并没有执行
    // a = new Promise(resolve => resolves.push(resolve))
    // 此时a是一个Promise，只有当执行resolve的时候, a.then(res)才会执行, 其中res就是setTimeout里的inner的执行结果，也就是关于dpRequest的Promise
    // 也就是说debounceRequest返回的是一个Promise，这个Promise里包裹的是关于dpRequest的Promise，也就是两层Promise
    // 但是JS会自动把内层的PromiseValue赋值给外层的PromiseValue，这样debounceRequest返回的Promise其实就直接包裹了dpRequest的结果了
  }
}
