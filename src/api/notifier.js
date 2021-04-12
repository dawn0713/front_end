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
        url:'/api_proxy/notifiers/notifier/',
        method:'delete',
        params:params
    })
}

export function createNotifier(data) {
    return request({
        url: '/api_proxy/notifiers/notifier/',
        method: 'post',
        data: data
    })
}

export function getNotifier(id) {
    return request({
        url: '/api_proxy/notifiers/notifier/'+id,
        method: 'get'
    })
}
export function updateNotifier(id,data) {
    return request({
        url: '/api_proxy/notifiers/notifier/'+id,
        method: 'put',
        data:data
    })
}