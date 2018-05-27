import React from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import { loadData } from '../../redux/user.redux'
import { connect } from 'react-redux'
//AuthRoute 不是router 对象 用这个注释来使用history
@withRouter
@connect(state => null, { loadData })
class AuthRoute extends React.Component {
    componentDidMount() {
        //如果在login和register页面 则不需要跳转
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if (publicList.indexOf(pathname) > -1) {
            return null
        }
        //get User Data
        axios.get('/user/info').then(
            res => {
                if (res.status === 200) {

                    if (res.data.code === 0) {
                        //有登录信息
                        this.props.loadData(res.data.data)
                        // console.log(res.data)
                    } else {

                        this.props.history.push('/login')
                    }

                }
            }
        )
        //if loged?
        // 判断 current url 是否要跳转login 
    }

    render() {
        return null;
    }

}

export default AuthRoute;