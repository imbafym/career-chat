import React from 'react'
import { NavBar, NavItem } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'


import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import User from '../../component/user/user'
import Genius from '../../component/genius/genius'
import Msg from '../../component/msg/msg'








@connect(state => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {


    componentDidMount() {
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList()
            this.props.recvMsg()
        }
    
    }

    render() {
        const { pathname } = this.props.location
        const user = this.props.user
        const navList = [
            {
                path: '/boss',
                text: 'genius',
                icon: 'boss',
                title: 'genius List',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title: 'Boss List',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: 'message',
                icon: 'msg',
                title: 'Message',
                component: Msg,
                // hide: user.type === 'boss'
            },
            {
                path: '/me',
                text: 'me',
                icon: 'user',
                title: 'Me',
                component: User
            }
        ]
        const page = navList.find(v => v.path == pathname)
        // console.log(JSON.stringify(page))
        return (
            <div>
                <NavBar className="fixd-header" mode="dark">{page.title}</NavBar>
                <div style={{ marginTop: 45 }}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component} />
                        ))
                        }
                    </Switch>
                </div>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>



        )
    }


}


export default Dashboard