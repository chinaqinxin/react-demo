import Loadable from 'react-loadable'

// import  Loadable from './loadable'

import {Loading} from '../components'
// import Dashboard from './Dashboard'
// import Login from './Login'
// import NotFound from './NotFound'
// import ActicleList from './Acticle'
// import ActicleEdit from './Acticle/Edit'
// import Settings from './Settings'
// 懒加载
const Dashboard = Loadable({
    loader:()=>import('./Dashboard'),
    loading:Loading
})
const Login = Loadable({
    loader:()=>import('./Login'),
    loading:Loading
})
const NotFound = Loadable({
    loader:()=>import('./NotFound'),
    loading:Loading
})
const ActicleList = Loadable({
    loader:()=>import('./Acticle'),
    loading:Loading
})
const ActicleEdit = Loadable({
    loader:()=>import('./Acticle/Edit'),
    loading:Loading
})
const Settings = Loadable({
    loader:()=>import('./Settings'),
    loading:Loading
})

export {
    Dashboard,Login,NotFound,ActicleList,ActicleEdit,Settings
} 