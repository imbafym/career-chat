import React from 'react'
import { connect } from 'react-redux'
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile'
import browserCookie from 'browser-cookies'
import { logoutSubmit } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(state => state.user, { logoutSubmit })
class User extends React.Component {

    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)

    }

    logout() {
        // console.log('log out')
        // browserCookie.erase('userid')
        const alert = Modal.alert
        alert('Logout', 'Are you sure?', [
            { text: 'cancel', onPress: () => console.log('cancel') }
            , {
                text: 'ok', onPress: () => {
                    browserCookie.erase('userid')
                    this.props.logoutSubmit()
                }
            }]

        )
    }


    render() {
        const props = this.props
        const Item = List.Item
        const Brief = List.Item.Brief
        console.log(this.props)

        // return props.user?(
	// 		<div>
	// 			<Result
	// 				img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt="" />}
	// 				title={props.user}
	// 				message={props.type=='boss'?props.company:null}
	// 			/>
				
	// 			<List renderHeader={()=>'简介'}>
	// 				<Item
	// 					multipleLine
	// 				>
	// 					{props.title}
	// 					{props.desc.split('\n').map(v=><Brief key={v}>{v}</Brief>)}
	// 					{props.money?<Brief>薪资:{props.money}</Brief>:null}
	// 				</Item>
					
	// 			</List>
	// 			<WhiteSpace></WhiteSpace>
	// 			<List>
	// 				<Item onClick={this.logout}>退出登录</Item>
	// 			</List>
	// 		</div>
	// 	):<Redirect to={props.redirectTo} />

	// }

        return this.props.user ? (
                <div>
                    <Result
                        img={
                            <img src={require(`../img/${this.props.avatar}.png`)} style={{ "width": 50 }} alt="" />
                        }
                        title={this.props.user}
                        message={this.props.type === 'boss' ? this.props.company : null}
                    />

                    <List renderHeader={() => 'Description'}
                    >
                        <Item
                            multipleLine
                        >
                            {this.props.title}
                            {this.props.desc ? this.props.desc.split('\n').map(v => <Brief key={v}>{v}</Brief>) : null}
                            {/* <Brief>{this.props.desc} </Brief> */}
                            {this.props.money ? this.props.money.split('\n').map(v => <Brief key={v}>{v}</Brief>) : null}

                        </Item>
                    </List>
                    <WhiteSpace></WhiteSpace>
                    <List>
                        <Item className=".logout" onClick={this.logout}>Logout</Item>
                    </List>
                    {/* <Button onClick={this.logout}  type="primary">Log Out</Button> */}
                </div>
            ): <Redirect to={this.props.redirectTo} />
        }
}


export default User