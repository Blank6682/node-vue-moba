import axios from 'axios';

const request = axios.create({
    baseURL: "http://localhost:3000/admin/api/",
    timeout: 5000
})

//请求拦截,主要是验证token
request.interceptors.request.use(
    config => {
        //验证token
        if (sessionStorage.getItem("token")) {
            config.headers["token"] = sessionStorage.getItem("token")
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截,主要是验证是否请求成功
request.interceptors.response.use(
    response => {
        const res = response.data
        if (res.status && res.status !== 200) {
            return Promise.reject(res || "error")
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        Promise.reject(error)
    }
)
export default request