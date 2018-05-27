import React from 'react'
import { NavBar, InputItem, TextareaItem, Button } from 'antd-mobile'
import AvatarSelector from '../../component/avatarselector/avatarselector'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { update } from '../../redux/user.redux'


@connect(
    state => state.user,
    { update }
)
class GeniusInfo extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            title: "",
            desc: '',
            avatar:''
        }
    }


    onChange(k, v) {
        this.setState(
            { [k]: v })
    }

    render() {

        const path = this.props.location.pathname
        const redirect = this.props.redirectTo

        return (
            <div>
                {/* {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null} */}
                {redirect && redirect !== path ? <Redirect to={this.props.redirectTo}></Redirect> : null}

                <NavBar mode="dark">Genius Infomation</NavBar>
                <AvatarSelector
                    selectAvatar={(v) => {
                        this.setState({
                            avatar: v
                        })
                    }}
                ></AvatarSelector>
                <InputItem onChange={v => { this.onChange('title', v) }}>
                    Position
                </InputItem>
               
                {/* <InputItem onChange={v => { this.onChange('money', v) }}>
                    Salary
                </InputItem> */}
                <TextareaItem
                    rows={3}
                    title="Description"
                    autoHeight
                    onChange={v => { this.onChange('desc', v) }}>
                </TextareaItem>
                <Button
                    onClick={
                        () => {
                            this.props.update(this.state)
                        }}
                    type='primary'>
                    Save</Button>
            </div>

        )

    }
}

export default GeniusInfo;