import Cookies from "js-cookie"
export default {
    state: {
        token: ''
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookies('token', val) // 缓存token
        },
        clearToken(state) {
            state.token = ''
            Cookies.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookies.get('token')
        }
    }
}