import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api_proxy/notifier/notifier_list/',
        method:'get',
        params:params
  })
}

export function deleteApplication(params) {
    return request({
        url:'/api_proxy/apps/apps/',
        method:'delete',
        params:params
    })
}
