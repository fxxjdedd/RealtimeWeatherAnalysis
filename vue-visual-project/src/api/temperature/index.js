import fetch from 'utils/fetch'
const temperatureApi = {}

temperatureApi.fetchList = function (listQuery) {
  return fetch({
    url: '/autoService/findAutoServiceOrder.do',
    method: 'get',
    params: { page: listQuery.page, city: listQuery.city, orderStatus: listQuery.orderStatus, serviceTypeId: listQuery.serviceTypeId, platformNumber: listQuery.platformNumber, repairShopId: listQuery.repairShopId, mobile: listQuery.mobile }
  })
}

temperatureApi.typeList = function () {
  return fetch({
    url: '/autoService/findTypeServiceGroup.do',
    method: 'get'
  })
}

temperatureApi.getserviceDotList = function () {
  return fetch({
    url: '/autoService/getServiceIdentification.do',
    method: 'get'
  })
}
export default temperatureApi
