import React, { Component } from 'react'


// loadable原理
const Loadable = ({
    loader,
    loading:Loading
})=>{
    return class LoadableComponent extends Component{
        state = {
            LoadedComponent: null
        }
        UNSAFE_componentDidMount(){ßßßß
            loader()
                .then(resp=>{
                    this.setState({
                            LoadedComponent:resp.default
                        })
                })
        }
        render(){
            const { LoadedComponent } = this.state
            return (
                LoadedComponent ? <LoadedComponent/> : <Loading/>
            )
        }
    }
}

export default Loadable