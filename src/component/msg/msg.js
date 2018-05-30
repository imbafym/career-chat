import React from 'react'
import { connect } from 'react-redux'
import { List, Badge} from 'antd-mobile'



@connect(state => state)
class Msg extends React.Component {

    getLst(arr) {
        return arr[arr.length - 1]
    }

    // chat id 分组
    render() {
        // if(!this.props.chat.chatList.length)
        // {
        //     return null
        // }
        const msgGroup = {}
        //分组？？？
        //todo, 将每个信息按照chatid分类
        //然后存入list 最后外层list包含各种chat_id list
        this.props.chat.chatmsg.forEach(
            v => {

                msgGroup[v.chatid] = msgGroup[v.chatid] || []

                msgGroup[v.chatid].push(v)
            }
        );

        //下面这个函数可以将value组成list 不出现key
        //同时 sort(a,b) 返回 b-a 可以按照从大到小的时间戳排序 显示有最新消息的用户列表
        const chatList = Object.values(msgGroup).sort((a,b)=>{
            const a_last = this.getLst(a).create_time
            const b_last = this.getLst(b).create_time
            console.log(this.getLst(a),this.getLst(b))
            return b_last-a_last
        })
        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userInfo = this.props.chat.users
        // console.log(chatList)
        return (
            <div>


                {chatList.map(v => {
                    console.log(v)
                    const lastItem = this.getLst(v)
                    const targetId = v[0].from === userid ? v[0].to : v[0].from
                    const unreadNum = v.filter(v=>!v.read&&v.to===userid).length
                    if (!userInfo[targetId]) {
                        return null
                    }
                    const username = userInfo[targetId] && userInfo[targetId].name
                    const avatar = userInfo[targetId] && userInfo[targetId].avatar

                    return (
                        <List key={lastItem._id}>
                            <Item
                                thumb={require(`../img/${avatar}.png`)}
                                extra={<Badge text={unreadNum}></Badge>}
                                arrow="horizontal"
                                onClick={()=>{
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {lastItem.content}
                                <Brief>{username}</Brief>
                            </Item>
                        </List>
                    )
                })}

            </div>
        )
    }


}

export default Msg