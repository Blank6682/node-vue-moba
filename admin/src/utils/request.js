import axios from 'axios';
import { ElMessage } from 'element-plus';
const request = axios.create({
    baseURL: "http://localhost:3000/admin/api/",
    timeout: 5000,
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
            ElMessage(res.message)
            return Promise.reject(res || "error")
        } else {
            return Promise.resolve(res)
        }
    },
    error => {
        return Promise.reject(error)
    }
)
export default request