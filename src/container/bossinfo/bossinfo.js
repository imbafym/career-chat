import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarselector/avatarselector'
import { connect } from 'react-redux'
import { update } from '../../redux/user.redux'
@connect(state => state, { update })
class BossInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            company: "",

            money: '',
            avatar: ''
        }
    }


    onChange(k, v) {
        this.setState(
            { [k]: v })
    }

    render() {
        return (
            <div>
                <NavBar mode="dark">Boss Infomation</NavBar>
                <AvatarSelector
                    selectAvatar={(v) => {
                        this.setState({
                            avatar: v
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={v => { this.onChange('title', v) }}>Hire Position
                </InputItem>
                <InputItem onChange={v => { this.onChange('company', v) }}>Company
                </InputItem>
                <InputItem onChange={v => { this.onChange('money', v) }}>Salary Range
                </InputItem>
                <TextareaItem
                    rows={3}
                    title="Job Description"
                    autoHeight
                    onChange={v => { this.onChange('desc', v) }}>
                </TextareaItem>
                <Button onClick={this.props.update(this.state)}>Save</Button>
            </div>

        )

    }
}

export default BossInfo;