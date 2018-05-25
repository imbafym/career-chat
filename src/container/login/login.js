import React from 'react';
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'
@connect(state => state.user, { login })
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            pwd: ''
        }
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

    }
    register() {
        console.log(this.props)
        this.props.history.push('/register')
    }
    handleOnChange(key, val) {
        this.setState({ [key]: val })
    }
    handleLogin() {
        this.props.login(this.state);
    }
    render() {
        return (
            <div>
                <Logo></Logo>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                {this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}

                <h2>Login</h2>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={v => this.handleOnChange('user', v)}>Username</InputItem>
                        <WhiteSpace />
                        <InputItem type="password" onChange={v => this.handleOnChange('pwd', v)}>Password</InputItem>
                    </List>
                    <Button onClick={this.handleLogin} type="primary">Login</Button>
                    <WhiteSpace />
                    <Button onClick={this.register} type="primary">Register</Button>
                </WingBlank>

            </div>
        );
    }
}

export default Login;