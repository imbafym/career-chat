import React from 'react'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'
import { getMsgList, recvMsg } from '../../redux/chat.redux'


import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import User from '../../component/user/user'
import Genius from '../../component/genius/genius'
import Msg from '../../component/msg/msg'
import QueueAnim from 'rc-queue-anim'







@connect(state => state, { getMsgList, recvMsg })
class Dashboard extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }
    componentDidCatch(err, info) {
        if (err) {
            this.setState({
                hasError: true
            })
        }
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
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
        console.log(page)
        //让动画生效 只渲染一个Route
        return this.state.hasError||!page ?
            <div>404</div>
            : (
                <div>
                    <NavBar className="fixd-header" mode="dark">{page.title}</NavBar>
                    <div style={{ marginTop: 45 }}>
                        <QueueAnim type={'scaleX'} duration={500}>
                            <Route key={page.path} path={page.path} component={page.component}></Route>
                        </QueueAnim>
                        {/* <Switch>
                        {navList.map(v => (
                          <Route key={v.path} path={v.path} component={v.component} />  
                        ))
                        }
                    </Switch> */}
                    </div>
                    <NavLinkBar data={navList}></NavLinkBar>
                </div>
            )
        // : <Redirect to="/msg"></Redirect>
    }


}


export default Dashboard