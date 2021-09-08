import axios from 'axios';

const request = axios.create({
    baseURL: "http://localhost:3000/admin/api/",
    timeout: 5000
})

//请求拦截,主要是验证token
axios.interceptors.request.use(
    config => {
        //暂不做验证
        // if (localStorage.getItem("token")) {
        //     config.headers["token"] = localStorage.getItem("token")
        // }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

//响应拦截,主要是验证是否请求成功
axios.interceptors.response.use(
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