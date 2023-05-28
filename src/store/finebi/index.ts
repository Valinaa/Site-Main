import { defineStore } from 'pinia'

// 使用setup模式定义
const useBILogin = defineStore(
    'BILogin',
    () => {
        const token = ref('')
        const data = ref('')

        function setToken(state: string) {
            token.value = state
            // Cookies.set('fine_auth_token', token)
        }
        function setData(state: string) {
            data.value = state
        }
        function getToken() {
            return token.value
        }
        function getData() {
            return data.value
        }
        return { token, data, setToken, setData, getToken, getData }
    },
    {
        persist: true,
    }
)
export default useBILogin
