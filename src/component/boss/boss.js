import React from 'react'
import axios from 'axios'
import { Card, WhiteSpace, WingBlank } from 'antd-mobile'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'


@connect(
    state => state.chatuser,
    { getUserList }
)
class Boss extends React.Component {

    static propTypes = {
        d: PropTypes.array.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            d: []
        }
    }

    componentDidMount() {
        this.props.getUserList('genius')
        // axios.get('/user/list?type=genius')
        //     .then(res => {
        //         if (res.data.code === 0) {

        //             this.setState({ d: res.data.data })
        //         }
        //     })
    }


    render() {
        return (
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }

}
export default Boss