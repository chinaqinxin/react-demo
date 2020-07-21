import React, { Component } from 'react'
// import {Button} from 'antd'
import { adminRouters } from './routes'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Frame } from './components'

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


class App extends Component {
    render() {
        return (
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
                                            return <route.component {...routerProps} />;
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
        )
    }
}

export default App