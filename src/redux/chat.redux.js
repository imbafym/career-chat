// import React from 'react'
import axios from 'axios'
import io from 'socket.io-client'
const git  = io('ws://localhost:9093')


//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//表示已读
const MSG_READ = 'MSG_READ'


const initState = {
    chatmsg: [],
    unread: 0,
    users: {}
}
export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            // console.log('chat list ',action.payload)
            return {
                ...state, chatmsg: action.payload.msgs,
                unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length,
                users: action.payload.users
            }
        case MSG_RECV:
            // console.log('action_receive',action.payload)
            //如果这条消息是发送给用户的 未读数量加一
            const num = action.payload.to === action.userid ? 1 : 0
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + num }
        case MSG_READ:
            const {from} = action.payload
            const number = action.payload.num
            return {...state, 
                chatmsg: state.chatmsg.map(v=>({...v,read:from===v.from?true:v.read})), 
                unread:state.unread-number}
        default:
            return state
    }
}

function msgRecv(msg, userid) {
    return { type: MSG_RECV, payload: msg, userid }
}

function msglist(msgs, users, userid) {
    return {
        type: MSG_LIST, payload: { msgs, users, userid }
    }
}
function msgRead({from, userid, num}) {
    return {
        type: MSG_READ, payload: { from, userid, num }
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('recvmsg', function (data) {
            // console.log('recvmsg', data)
            const userid = getState().user._id

            dispatch(msgRecv(data._doc, userid))
        })
    }
}

export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }

}

export function readMsg(from) {
    return (dispatch, getState) => {
        const userid = getState().user._id
        axios.post('/user/readmsg', { from })
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgRead({from, userid, num:res.data.num}))
                }
            })


    }
}

export function getMsgList() {
    // getState 获取redux内所有信息
    return (dispatch, getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status = 200 && res.data.code === 0) {
                    // console.log('getmsglist method',res.data)
                    // const children = res.data.msgs
                    const userid = getState().user._id
                    dispatch(msglist(res.data.msgs, res.data.users, userid))
                }
                return res.data.code
            })
    }
}

