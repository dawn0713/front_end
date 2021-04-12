import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api_proxy/notifiers/notifiers_list/',
        method:'get',
        params:params
  })
}

export function deleteApplication(params) {
    return request({
        url:'/api_proxy/notifiers/notifiers_list/',
        method:'delete',
        params:params
    })
}
