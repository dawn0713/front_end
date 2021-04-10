import request from '@/utils/request'
export function fetchList(params) {
    return request({
        url:'/api_proxy/rule_engine/rule_list/',
        method:'get',
        params:params
  })
}

export function deleteRules(params) {
    return request({
        url:'/api_proxy/rule_engine/rule/',
        method:'delete',
        params:params
    })
}

export function createRules(data) {
    return request({
        url: '/api_proxy/rule_engine/rule/',
        method: 'post',
        data: data
    })
}


export function getRules(id) {
    return request({
        url: '/api_proxy/rule_engine/rule/'+id,
        method: 'get'
    })
}
export function updateRules(id,data) {
    return request({
        url: '/api_proxy/rule_engine/rule/'+id,
        method: 'post',
        data:data
    })
}