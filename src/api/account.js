import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api_proxy/accounts/accounts_list/',
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

export function createApplication(data) {
    return request({
        url: '/api_proxy/apps/apps/',
        method: 'post',
        data: data
    })
}

export function getApplication(id) {
    return request({
        url: '/api_proxy/apps/apps/'+id,
        method: 'get'
    })
}
export function updateApplication(id,data) {
    return request({
        url: '/api_proxy/apps/apps/'+id,
        method: 'put',
        data:data
    })
}