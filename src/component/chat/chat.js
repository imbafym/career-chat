import React from 'react'
import { InputItem, List, NavBar, Icon, Grid } from 'antd-mobile'
// import io from 'socket.io-client'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg, readMsg } from '../../redux/chat.redux'
import { getChatId } from '../../util/util';
import QueueAnim from 'rc-queue-anim'

//跨域了 所以要穿东西
// const socket = io('ws://localhost:9093')
@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg, readMsg })
class Chat extends React.Component {
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }
        this.fixCarousel()


        // socket.on('recvmsg', (data) => {
        //     console.log(data)
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })

    }
    //组件退出时 发送请求将更改redux已读消息
    componentWillUnmount() {
        const to = this.props.match.params.user
        this.props.readMsg(to)
    }


    fixCarousel() {

        setTimeout(() => {
            window.dispatchEvent(new Event('resize')), 0
        })
    }
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: [],
            showEmoji: false
        }
    }
    handleSubmit() {
        // socket.emit('sendmsg', { text: this.state.text })

        const from = this.props.user._id
        console.log('this is props', this.props)
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '', showEmoji: false })
    }
    render() {
        console.log(this.props)
        //对方的id
        const userid = this.props.match.params.user
        const Item = List.Item
        //所有聊天对象
        const users = this.props.chat.users
        if (!users[userid]) {
            return null
        }
        //结合chatid 用对方的和自己的id拼接
        const chatid = getChatId(userid, this.props.user._id)
        // console.log("chatid is ", chatid)
        //筛选信息
        const chatmsgs = this.props.chat.chatmsg.filter(
            v => {
                return v.chatid === chatid
            })
        // console.log("what we got msg is ", chatmsgs)
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))


        return (
            <div id='chat-page'>
                <NavBar mode='dark'
                    icon={<Icon type="left"></Icon>}
                    onLeftClick={() => this.props.history.goBack()}>
                    {users[userid].name}
                </NavBar>
             
				<QueueAnim delay={10}>
					{chatmsgs.map(v=>{
						const avatar = require(`../img/${users[v.from].avatar}.png`)
						return v.from==userid?(
							<List key={v._id}>
								<Item
									thumb={avatar}
								>{v.content}</Item>
							</List>
						
						):(
							<List key={v._id}>
								<Item
									extra={<img alt='头像' src={avatar} />}
								 	className='chat-me'
								 	>{v.content}</Item>
							</List>

						)
					})}
				</QueueAnim>
                <div className='stick-footer'>
                    <List>

                        <InputItem
                            placeholder='please type'
                            value={this.state.text}
                            onChange={v => {
                                this.setState({
                                    text: v
                                })
                            }}
                            extra={
                                <div>
                                    <span
                                        style={{
                                            "marginRight": 15
                                        }}
                                        onClick={() => {
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                            this.fixCarousel()
                                        }
                                        }> 😀</span>
                                    <span onClick={() => this.handleSubmit()}>send</span>


                                </div>
                            }
                        >
                        </InputItem>
                    </List>
                    {this.state.showEmoji ?
                        <Grid data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({
                                    text: this.state.text + el.text
                                })
                            }}

                        />
                        : null}
                </div>
            </div >)
    }
}

export default Chat