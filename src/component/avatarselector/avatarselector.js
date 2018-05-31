import React from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types'


class AvatarSelector extends React.Component {
    //强力校验 必须传 且为function
    static propTypes = {
		selectAvatar: PropTypes.func.isRequired
	}

   
    constructor(props){
        super(props)
        this.state={
            text:''
        }
    }


    render() {
        const avatarList = 'avatar,male,ninja,v'.split(',').map(v => ({
            icon: require(`../img/${v}.png`),
            text: v
        })
        )
        const gridHeader = this.state.icon
            ? (<div><span>Selected</span>
                <img style={{ width: 20 }} src={this.state.icon} alt="avatar" />
            </div>) : 'Please Select Avatar'
        return (

            <div>
                <List renderHeader={() => gridHeader}>
                    <Grid data={avatarList}
                        onClick={v => {
                            this.setState(v)
                            this.props.selectAvatar(v.text)
                        }} />
                </List>
                Avatar Selector
            </div>

        )

    }
}

export default AvatarSelector;