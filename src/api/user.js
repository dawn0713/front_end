import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url: '/ums/list',
        method: 'get',
        params: params
    })
}
export function createUser(data) {
    return request({
        url: '/ums/create',
        method: 'post',
        data: data
    })
}
export function deleteUser(id) {
    return request({
        url: '/ums/delete/'+id,
        method: 'get'
    })
}
export function getUser(id) {
    return request({
        url: '/ums/'+id,
        method: 'get'
    })
}
export function updateUser(id,data) {
    return request({
        url: '/ums/update/'+id,
        method: 'post',
        data:data
    })
}
export function updateShowStatus(data) {
    return request({
        url: '/ums/update/status',
        method: 'post',
        data: data
    })
}