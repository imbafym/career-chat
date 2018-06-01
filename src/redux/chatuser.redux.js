// import React from 'react'
import axios from 'axios';


const USER_LIST = "USER_LIST"
const URL = 'https://evening-savannah-21157.herokuapp.com/'

const initState = {
    userlist: []
}

export function chatuser(state = initState, action) {
    switch (action.type) {
        case USER_LIST:
            return { ...state, userlist: action.payload }

        default:
            return state

    }
}


function userList(data) {
    return { type: USER_LIST, payload: data }
}


export function getUserList(type) {
    return dispatch => {
        axios.get(`${URL}/user/list?type=` + type).then(res => {
            if (res.data.code === 0) {
                console.log(res)
                dispatch(userList(res.data.data))
            }
        }
        )



    }


    // axios.get('/user/list?type=genius')
    //     .then(res => {
    //         if (res.data.code === 0) {

    //             this.setState({ d: res.data.data })
    //         }
    //     })

}


