
import axios from 'axios'
import { getRedirectPath } from '../util/util'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// AUTH SUCEESS 代表login update 和 reigster
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const LOAD_DATA = 'LOAD_DATA'
const LOGOUT = 'LOGOUT'
const initState = {
    redirectTo: '',
    // isAuth:false
    msg: '',
    user: '',
    // pwd: '',
    type: ''
}


//reducer
export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, msg: '', redirectTo: getRedirectPath(action.payload),
                ...action.payload
            }
        case ERROR_MESSAGE:
            return { ...state, msg: action.msg, isAuth: false }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        case LOGOUT:
            return { ...initState, redirectTo:'/login' }
        default:
            return state;
    }

    return state
}

//actions
function authSuccess(obj) {
    //过滤pwd
    const { pwd, ...data } = obj
    return { type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MESSAGE }
}
function logout() {
    return { type: LOGOUT }
}
// function registSuccess(data) {
//     return { type: REGISTER_SUCCESS, payload: data }
// }
// function loginSuccess(data) {
//     return { type: LOGIN_SUCCESS, payload: data }
// }
export function loadData(userInfo) {
    console.log(userInfo)
    return { type: LOAD_DATA, payload: userInfo }
}

export function logoutSubmit() {
    return logout()
}

export function login({ user, pwd }) {

    if (!user || !pwd) {
        return errorMsg('username and password cannot be empty')
    }

    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(
                res => {
                    if (res.status === 200 && res.data.code === 0) {
                        dispatch(authSuccess(res.data.data))
                    } else {
                        dispatch(errorMsg(res.data.msg))
                    }
                }
            )
    }

}

export function register({ user, pwd, type, repeatpwd }) {

    if (!user || !pwd || !type) {
        return errorMsg('USER NAME AND PWD MUST BE TYPED')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('password must be the same')
    }

    return dispatch => {
        axios.post('/user/register', { user, pwd, type }).
            then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess({ user, pwd, type }))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}

export function update(data) {
    console.log(JSON.stringify(data) + ' this data is from update method in redux')
    return dispatch => {
        axios.post('/user/update', data).
            then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    console.log(res.data.data)
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}