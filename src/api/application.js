import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api_proxy/apps/apps_list/',
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