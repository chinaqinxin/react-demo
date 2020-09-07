import {
    Dashboard,Login,NotFound,ActicleList,ActicleEdit,Settings,Notifications
} from '../views'

export const mainRouters = [{
    pathname:'/login',
    component:Login
},{
    pathname:'/404',
    component:NotFound
}]

export const adminRouters = [{
    pathname:'/admin/dashboard',
    component:Dashboard,
    title:'仪表盘',
    icon:'dashboard',
    isNav:true
},{
    pathname:'/admin/article',
    component:ActicleList,
    exact:true,
    title:'文章管理',
    icon:'unordered-list',
    isNav:true
},{
    pathname:'/admin/article/edit/:id',
    component:ActicleEdit
},{
    pathname:'/admin/notifications',
    component:Notifications
},{
    pathname:'/admin/settings',
    component:Settings,
    title:'设置',
    icon:'setting',
    isNav:true
}]