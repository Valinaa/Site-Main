import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
} from 'axios'
import showCodeMessage from '@/utils/code'
import { formatJsonToUrlParams, instanceObject } from '@/utils/format'
import { ElMessage } from 'element-plus'
import BILoginStore from '@/store/finebi'

const BASE_PREFIX = import.meta.env.VITE_API_BASEURL
const useBILoginStore = BILoginStore()
const { getToken } = useBILoginStore
// 创建实例
const axiosInstance: AxiosInstance = axios.create({
    // 前缀
    baseURL: BASE_PREFIX,
    // 超时
    timeout: 1000 * 30,
    // 请求头
    headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: '',
    },
})
// 请求拦截器
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // TODO 在这里可以加上想要在请求发送前处理的逻辑
        // TODO 比如 loading 等
        if (getToken() !== '' && config.headers !== undefined) {
            // eslint-disable-next-line no-param-reassign
            config.headers.Authorization = `Bearer ${getToken()}`
        }
        // console.log(store.getters.token)
        // if (store.getters.token) {
        //   config.headers['Authorization'] = store.getters.token // 让每个请求携带token--['Authorization']为自定义key 请根据实际情况自行修改
        // }
        return config
    },
    (error: AxiosError) => {
        // todo 请求失败逻辑
        return Promise.reject(error)
    }
)

// 响应拦截器
axiosInstance.interceptors.response.use((response: AxiosResponse) => {
    if (response.status === 200) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const res = response.data
        if (res.success) {
            return Promise.resolve(res)
        }
        // todo 记得修改data
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        ElMessage.error(res.errorMsg)
        return Promise.reject(res).catch((e) => {})
    }
    ElMessage.info(JSON.stringify(response.status))
    return response
})
const service = {
    get<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.get(url, { params: data })
    },

    post<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.post(url, data)
    },

    put<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.put(url, data)
    },

    delete<T>(url: string, data?: object): Promise<T> {
        return axiosInstance.delete(url, data)
    },

    upload: (url: string, file: FormData | File) =>
        axiosInstance.post(url, file, {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            headers: { 'Content-Type': 'multipart/form-data' },
        }),
    download: (url: string, data: instanceObject) => {
        window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(
            data
        )}`
    },
}

export default service
