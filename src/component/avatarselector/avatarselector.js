import React from 'react'
import { List, Grid } from 'antd-mobile'


class AvatarSelector extends React.Component {
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
        const gridHeader = this.state.text
            ? (<div><span>Selected</span>
                <img style={{ width: 20 }} src={this.state.icon} />
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