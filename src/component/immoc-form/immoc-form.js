import React from 'react'

export default function immocForm(Comp) {

//HOC 高阶组件 练习
    return class WrapperComp extends React.Component {
        constructor(props) {
            super(props)
            this.state = {}
            this.handleChange = this.handleChange.bind(this)
        }


        handleChange(key, val) {
            console.log('this is handleChange')
            this.setState({ [key]: val })
        }
        render() {
            return <Comp handleChange={this.handleChange} state={this.state} {...this.props}> </Comp>
        }
    }
}