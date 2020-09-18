import request from '@/utils/request'
export function policy() {
  return request({
    url:'/aliyun/oss/policy',
    method:'get',
  })
}
// export function callback(data) {
//   return request({
//     url: '/aliyun/oss/callback',
//     method: 'post',
//     data: data
//   })
// }
