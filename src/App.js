import React, { Component } from 'react'
// import {Button} from 'antd'
import { adminRouters } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Frame } from './components'
import { connect } from 'react-redux'

const menus = adminRouters.filter(route => route.isNav === true)

// 高阶组件
// const testHOC=(WrappedComponent)=>{
//     return class HOCComponent extends Component{
//         render(){
//             return (
//                 <>
//                     <WrappedComponent/>
//                     <div>这是高阶组件里的信息</div>
//                 </>
//             )
//         }
//     }
// }

// @testHOC



@connect(
    state=>({
        isLogin:state.user.isLogin,
        role:state.user.role
    })
)
class App extends Component {
    render() {
        const {isLogin,role} = this.props
        return (
            
                isLogin ? 
                
            <Frame menus={menus}>
                <div>
                    {/* 111
                <Button type='primary'>Send</Button> */}
                    {/* <div>这是公共的部分</div> */}
                    <Switch>
                        {
                            adminRouters.map((route) => {
                                return (
                                    <Route
                                        key={route.pathname}
                                        path={route.pathname}
                                        exact={route.exact}
                                        render={routerProps => {
                                            // console.log(route.roles.includes(role))
                                            const hasPermission = route.roles.includes(role)
                                            return hasPermission ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth"/>;
                                        }}
                                    />
                                );
                            })
                        }
                        <Redirect to={adminRouters[0].pathname} from='/admin' exact />
                        <Redirect to="/404" />
                    </Switch>
                </div>
            </Frame>
            :
            <Redirect to="/login"/>
            
        )
    }
}

export default App