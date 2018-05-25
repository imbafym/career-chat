
import axios from 'axios'
import { getRedirectPath } from '../util/util'
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
// const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
// AUTH SUCEESS 代表login update 和 reigster
const AUTH_SUCCESS = 'LOGIN_SUCCESS'
const ERROR_MESSAGE = 'ERROR_MESSAGE'
const LOAD_DATA = 'LOAD_DATA'
const SAVE_INFO = 'SAVE_INFO'
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
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case ERROR_MESSAGE:
            return { ...state, msg: action.msg, isAuth: false }
        case LOAD_DATA:
            return { ...state, ...action.payload }
        default:
            return state;
    }

    return state
}

//actions
function authSuccess(data) {
    return {  type: AUTH_SUCCESS, payload: data }
}
function errorMsg(msg) {
    return { msg, type: ERROR_MESSAGE }
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

//not actions
export function userinfo() {

    return dispatch => {
        //get User Data
        axios.get('/user/info').then(
            res => {
                if (res.status === 200) {

                    if (res.data.code === 0) {
                        //有登录信息
                        console.log(res.data)
                    } else {
                        this.props.history.push('/login')
                    }

                }
            }
        )
        //if loged?
        // 判断 current url 是否要跳转login 
    }

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
    const {title,company,money,avatar} = data
   
    return dispatch => {
        axios.post('/user/update', data ).
            then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(authSuccess(res.data.data))
                } else {
                    dispatch(errorMsg(res.data.msg))
                }
            })
    }

}