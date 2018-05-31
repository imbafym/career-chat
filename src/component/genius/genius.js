import React from 'react'
// import axios from 'axios'

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/chatuser.redux'
import UserCard from '../usercard/usercard'

@connect(
    state => state.chatuser,
    { getUserList }
)
class Genius extends React.Component {

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
        this.props.getUserList('boss')
    }


    render() {
        return (
            <UserCard userlist={this.props.userlist}></UserCard>
        )
    }

}
export default Genius