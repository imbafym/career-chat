import React from 'react'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component {

    static propTypes = {
        userList: PropTypes.array.isRequired
    }


    handleClick(v){
        console.log(this.props)
        this.props.history.push(`/chat/${v._id}`)
    }
    render() {
        const Header = Card.Header
        const Body = Card.Body


        return (
            <WingBlank>
                <WhiteSpace></WhiteSpace>
                {this.props.userlist.map(v => (

                    v.avatar ? (<Card 
                        key={v._id} 
                        onClick={()=>this.handleClick(v)
                       
                    }
                    style={{"zIndex":1}}>
                        <Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>} >
                        </Header>
                        <Body>
                            {v.type === 'boss' ? (<div>Company: {v.company}</div>) : null}

                            {v.desc.split('/n').map(v => (
                                <div key={v}>Description: {v}</div>
                            ))}
                            {v.type==='boss'?(<div>Title: {v.title}</div>):null}
                            
                        </Body>
                    </Card>) : null
                ))}
            </WingBlank>



        )
    }
}


export default UserCard