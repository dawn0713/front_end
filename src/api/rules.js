import request from '@/utils/request'
export function fetchList(params) {
    debugger
    return request({
        url:'/api_proxy/rule_engine/rule_list/',
        method:'get',
        params:params
  })
}

export function deleteApplication(params) {
    return request({
        url:'/api_proxy/rule_engine/rule/',
        method:'delete',
        params:params
    })
}
