import React from 'react'
import {render} from 'react-dom'
import App from './App'
import {BrowserRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRouters} from './routes'
import zhCN from 'antd/es/locale/zh_CN';
import './index.less'
import {ConfigProvider} from 'antd'
import store from './store'
import {Provider} from 'react-redux'
render(
    <Provider store={store}>
            <ConfigProvider locale={zhCN}>
                <Router>
                    <Switch>
                        <Route path='/admin' render={(routerProps)=>{
                            // TOOD 权限，需要登陆才能访问admin
                            return <App {...routerProps}/>
                        }}/>
                        {
                            mainRouters.map(route=>{
                                return <Route key={route.pathname} path={route.pathname} component={route.component}/>
                            })
                        }
                        <Redirect to='/admin' from='/' exact/>
                        <Redirect to='/404'/>
                    </Switch>
                </Router>
                </ConfigProvider>

    </Provider>
    
    ,document.querySelector('#root')
)