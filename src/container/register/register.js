import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { register } from '../../redux/user.redux'
import './index.css'
@connect(state => state.user, { register })
class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: '',
            repeatpwd: '',
            type: 'genius'// or boss
        }
        this.handleRegister = this.handleRegister.bind(this)
    }
    handleChange(key, value) {
        this.setState({
            [key]: value
        })
    }
    handleRegister() {
        this.props.register(this.state)
    }
    render() {
        const RadioItem = Radio.RadioItem;

        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <List>
                    {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                    <WhiteSpace />
                    <InputItem onChange={(v) => {
                        this.handleChange('user', v)
                    }}>Username</InputItem>
                    <WhiteSpace />

                    <InputItem type="password" onChange={(v) => {
                        this.handleChange('pwd', v)
                    }}>Password</InputItem>
                    <WhiteSpace />

                    <InputItem type="password" onChange={(v) => {
                        this.handleChange('repeatpwd', v)
                    }}>Re-Password</InputItem>
                    <WhiteSpace />

                    <RadioItem
                        checked={this.state.type === "genius"}
                        onChange={() => this.handleChange('type', 'genius')}
                    >Genius</RadioItem>
                    <RadioItem checked={this.state.type === "boss"}
                        onChange={() => this.handleChange('type', 'boss')}
                    >Boss</RadioItem>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.handleRegister}>Confirm</Button>
                </List>
            </div>
        );
    }
}

export default Register;