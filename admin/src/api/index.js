import request from '../utils/request';

//get请求，获取数据
export function get (url) {
    return request({
        url: url,
        method: "GET"
    })
}

//post请求，提交数据
export function post (url, data) {
    return request({
        url: url,
        method: "POST",
        data
    })
}

//put请求，更新数据
export function put (url, data) {
    return request({
        url: url,
        method: "PUT",
        data
    })
}

//删除数据
export function del (url) {
    return request({
        url: url,
        method: "DELETE"
    })
}
