import React from 'react'
import { NavBar, NavItem } from 'antd-mobile'
import { connect } from 'react-redux'
import NavLinkBar from '../navlink/navlink'


function Boss() {
    return <h1>Boss Page</h1>
}

function Genius() {
    return <h1>Genius Page</h1>
}

function MSG() {
    return <h1>MSG Page</h1>
}

function User() {
    return <h1>User Page</h1>
}




@connect(state => state)
class Dashboard extends React.Component {



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
                component: MSG,
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
        return (
            <div>
                <NavBar mode="dark">{page.title}</NavBar>
                <h1>Content</h1>

                <NavLinkBar data={navList}></NavLinkBar>
            </div>



        )
    }


}


export default Dashboard